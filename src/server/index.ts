/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";
import mongoose from "mongoose";
import { ChatMessage } from "./models/ChatMessage";
import { Room } from "./models/Room";
import jwt from "jsonwebtoken";
import "./config";
import { generateRoomCode } from "./utils/roomCode";
import { RoomType, DebateRole, MessageType } from "./types";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.VITE_CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const mongoUri = process.env.VITE_MONGODB_URI;
if (!mongoUri) {
  throw new Error("VITE_MONGODB_URI environment variable is not defined");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
// app.use("/room", roomRoutes);

// 在线用户管理
const onlineUsers = new Map();
const userRooms = new Map();

// 房间状态管理
const roomStates = new Map();

// Socket中间件 - 验证token
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.error('No token provided');
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    socket.data.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log('New client connected');

  const userId = socket.data.user.userId;
  onlineUsers.set(socket.id, userId);

  // 创建房间
  socket.on("createRoom", async (data) => {
    try {
      const { name, type, password } = data;
      const roomCode = generateRoomCode();
      
      const room = new Room({
        name,
        type,
        code: roomCode,
        password: password || undefined,
        createdBy: userId,
        participants: [userId]
      });
      await room.save();

      // 初始化房间状态
      roomStates.set(room._id.toString(), {
        type,
        activeUsers: new Set([userId]),
        bannedUsers: new Set(),
        mutedUsers: new Set(),
        ...(type === RoomType.DEBATE && {
          debateState: {
            currentSpeaker: null,
            timeLeft: 0,
            roles: new Map()
          }
        })
      });

      socket.emit("roomCreated", { roomId: room._id.toString(), roomCode });
    } catch (error) {
      console.error("Failed to create room:", error);
      socket.emit("error", "Failed to create room");
    }
  });

  // 获取房间列表
  socket.on("getRooms", async () => {
    try {
      const rooms = await Room.find({ status: "active" })
        .populate("createdBy", "name")
        .populate("participants", "name");
      socket.emit("roomsList", rooms);
    } catch (error) {
      socket.emit("error", "Failed to fetch rooms");
    }
  });

  // 获取单个房间
  socket.on("getRoom", async (roomId) => {
    try {
      if (!roomId) {
        socket.emit("error", "Room ID is required");
        return;
      }
      const room = await Room.findById(roomId)
        .populate("createdBy", "name")
        .populate("participants", "name");
      
      if (!room) {
        socket.emit("error", "Room not found");
        return;
      }
      
      socket.emit("roomDetails", room);
    } catch (error) {
      socket.emit("error", "Failed to fetch room");
    }
  });

  // 删除房间
  socket.on("deleteRoom", async (roomId) => {
    try {
      const room = await Room.findById(roomId);
      
      if (!room) {
        socket.emit("error", "Room not found");
        return;
      }

      if (room.createdBy.toString() !== socket.data.user.userId) {
        socket.emit("error", "Not authorized");
        return;
      }

      await Room.findByIdAndUpdate(roomId, { status: "inactive" });
      
      // 通知所有客户端房间已删除
      io.emit("roomDeleted", roomId);
    } catch (error) {
      socket.emit("error", "Failed to delete room");
    }
  });

  // 加入房间
  socket.on("joinRoom", async (data) => {
    try {
      const { roomId, password, code } = data;
      const room = await Room.findOne({
        $or: [{ _id: roomId }, { code }]
      });

      if (!room) {
        socket.emit("error", "Room not found");
        return;
      }

      // 验证密码
      if (room.password && room.password !== password) {
        socket.emit("error", "Invalid password");
        return;
      }

      const roomState = roomStates.get(room._id.toString());
      
      // 检查用户是否被封禁
      if (roomState.bannedUsers.has(userId)) {
        socket.emit("error", "You are banned from this room");
        return;
      }

      // 离开之前的房间
      if (userRooms.has(socket.id)) {
        const previousRoom = userRooms.get(socket.id);
        socket.leave(previousRoom);
        
        await Room.findByIdAndUpdate(previousRoom, {
          $pull: { participants: userId }
        });
      }

      // 加入新房间
      socket.join(room._id.toString());
      userRooms.set(socket.id, room._id.toString());
      roomState.activeUsers.add(userId);
      
      await Room.findByIdAndUpdate(room._id, {
        $addToSet: { participants: userId }
      });

      // 获取房间历史消息
      const messages = await ChatMessage.find({ room: room._id })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate("user", "name");
      
      socket.emit("messages", messages.reverse());

      // 广播房间状态更新
      io.to(room._id.toString()).emit("roomState", {
        activeUsers: Array.from(roomState.activeUsers),
        ...roomState
      });

      // 发送系统消息
      const systemMessage = new ChatMessage({
        type: MessageType.SYSTEM,
        content: `${socket.data.user.name} joined the room`,
        room: room._id
      });
      await systemMessage.save();
      io.to(room._id.toString()).emit("message", systemMessage);

      // 成功加入房间后发送roomJoined事件
      socket.emit("roomJoined", { roomId: room._id.toString() });

    } catch (error) {
      socket.emit("error", "Failed to join room");
    }
  });

  // 发送消息
  socket.on("sendMessage", async (data) => {
    try {
      const { content, roomId, replyTo, type = MessageType.TEXT } = data;
      const room = await Room.findById(roomId);
      
      if (!room) {
        socket.emit("error", "Room not found");
        return;
      }

      const roomState = roomStates.get(roomId);
      
      // 检查是否被禁言
      if (roomState.mutedUsers.has(userId)) {
        socket.emit("error", "You are muted in this room");
        return;
      }

      const message = new ChatMessage({
        content,
        type,
        user: userId,
        room: roomId,
        replyTo: replyTo || undefined
      });
      await message.save();

      io.to(roomId).emit("newMessage", {
        ...message.toObject(),
        user: socket.data.user
      });
    } catch (error) {
      socket.emit("error", "Failed to send message");
    }
  });

  // 房间管理功能
  socket.on("kickUser", async (data) => {
    try {
      const { roomId, targetUserId } = data;
      const room = await Room.findById(roomId);
      
      if (!room || room.createdBy.toString() !== userId) {
        socket.emit("error", "Not authorized");
        return;
      }

      const roomState = roomStates.get(roomId);
      roomState.activeUsers.delete(targetUserId);

      // 查找目标用户的socket
      const targetSocket = Array.from(io.sockets.sockets.values())
        .find(s => s.data.user.id === targetUserId);
      
      if (targetSocket) {
        targetSocket.leave(roomId);
        targetSocket.emit("kicked", { roomId });
      }

      await Room.findByIdAndUpdate(roomId, {
        $pull: { participants: targetUserId }
      });

      io.to(roomId).emit("roomState", {
        activeUsers: Array.from(roomState.activeUsers),
        ...roomState
      });
    } catch (error) {
      socket.emit("error", "Failed to kick user");
    }
  });

  // 辩论室功能
  socket.on("setDebateRole", async (data) => {
    try {
      const { roomId, targetUserId, role } = data;
      const room = await Room.findById(roomId);
      
      if (!room || room.type !== RoomType.DEBATE) {
        socket.emit("error", "Invalid room type");
        return;
      }

      const roomState = roomStates.get(roomId);
      roomState.debateState.roles.set(targetUserId, role);

      io.to(roomId).emit("debateState", roomState.debateState);
    } catch (error) {
      socket.emit("error", "Failed to set debate role");
    }
  });

  socket.on("startDebate", async (data) => {
    try {
      const { roomId, speakingTime } = data;
      const room = await Room.findById(roomId);
      
      if (!room || room.type !== RoomType.DEBATE) {
        socket.emit("error", "Invalid room type");
        return;
      }

      const roomState = roomStates.get(roomId);
      const { debateState } = roomState;

      // 设置第一个发言者
      const proSpeakers = Array.from(debateState.roles.entries())
        .filter(([_, role]) => role === DebateRole.PRO);
      
      if (proSpeakers.length > 0) {
        debateState.currentSpeaker = proSpeakers[0][0];
        debateState.timeLeft = speakingTime;

        // 开始计时
        const timer = setInterval(() => {
          debateState.timeLeft -= 1;
          
          if (debateState.timeLeft <= 0) {
            clearInterval(timer);
            io.to(roomId).emit("speakingTimeUp");
          }
          
          io.to(roomId).emit("debateState", debateState);
        }, 1000);
      }

      io.to(roomId).emit("debateStarted", debateState);
    } catch (error) {
      socket.emit("error", "Failed to start debate");
    }
  });

  // 随机匹配
  socket.on("findRandomMatch", () => {
    try {
      const waitingUsers = Array.from(onlineUsers.entries())
        .filter(([socketId, _]) => !userRooms.has(socketId));
      
      if (waitingUsers.length >= 2) {
        const [user1, user2] = waitingUsers.slice(0, 2);
        
        // 创建随机房间
        const room = new Room({
          name: "Random Chat",
          type: RoomType.RANDOM,
          participants: [user1[1], user2[1]]
        });
        room.save().then(() => {
          const roomId = room._id.toString();
          
          // 将两个用户加入房间
          const socket1 = io.sockets.sockets.get(user1[0]);
          const socket2 = io.sockets.sockets.get(user2[0]);
          
          socket1?.join(roomId);
          socket2?.join(roomId);
          
          userRooms.set(user1[0], roomId);
          userRooms.set(user2[0], roomId);
          
          // 初始化房间状态
          roomStates.set(roomId, {
            type: RoomType.RANDOM,
            activeUsers: new Set([user1[1], user2[1]]),
            bannedUsers: new Set(),
            mutedUsers: new Set()
          });

          // 通知用户匹配成功
          io.to(roomId).emit("matchFound", { roomId });
        });
      }
    } catch (error) {
      socket.emit("error", "Failed to find match");
    }
  });

  // 断开连接
  socket.on("disconnect", async (reason) => {
    console.log('Client disconnected:', reason);

    try {
      if (userRooms.has(socket.id)) {
        const roomId = userRooms.get(socket.id);
        const roomState = roomStates.get(roomId);
        
        if (roomState) {
          roomState.activeUsers.delete(userId);
          
          // 更新房间状态
          io.to(roomId).emit("roomState", {
            activeUsers: Array.from(roomState.activeUsers),
            ...roomState
          });
        }
        
        await Room.findByIdAndUpdate(roomId, {
          $pull: { participants: userId }
        });
      }

      onlineUsers.delete(socket.id);
      userRooms.delete(socket.id);
    } catch (error) {
      console.error("Error handling disconnect:", error);
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 WebSocket server ready`);
});
