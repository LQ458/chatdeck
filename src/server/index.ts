import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import mongoose from 'mongoose';
import { ChatMessage } from './models/ChatMessage';
import './config';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

const mongoUri = process.env.VITE_MONGODB_URI;
if (!mongoUri) {
  throw new Error("VITE_MONGODB_URI environment variable is not defined");
}

// Connect to MongoDB

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// 中间件
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// 在线用户管理
const onlineUsers = new Map();

// Socket.io 处理
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // 用户加入
  socket.on('join', async (userId) => {
    onlineUsers.set(socket.id, userId);
    io.emit('userList', Array.from(onlineUsers.values()));

    // 获取历史消息
    const messages = await ChatMessage.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('user', 'name');
    socket.emit('history', messages.reverse());
  });

  // 发送消息
  socket.on('message', async (data) => {
    const { content, userId } = data;
    
    try {
      const message = new ChatMessage({
        content,
        user: userId
      });
      await message.save();
      
      const populatedMessage = await message.populate('user', 'name');
      io.emit('message', populatedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // 用户断开连接
  socket.on('disconnect', () => {
    onlineUsers.delete(socket.id);
    io.emit('userList', Array.from(onlineUsers.values()));
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
