/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { RoomType, DebateRole, MessageType } from "../server/types";

interface Message {
  id: string;
  content: string;
  type: MessageType;
  user?: {
    id: string;
    name: string;
  };
  timestamp: Date;
}

interface RoomState {
  activeUsers: string[];
  bannedUsers: string[];
  mutedUsers: string[];
  debateState?: {
    currentSpeaker: string | null;
    timeLeft: number;
    roles: Map<string, DebateRole>;
  };
}

interface SocketStore {
  socket: Socket | null;
  connected: boolean;
  messages: Message[];
  currentRoom: string | null;
  roomState: RoomState | null;
  connect: () => void;
  disconnect: () => void;
  createRoom: (data: {
    name: string;
    type: RoomType;
    password?: string;
  }) => Promise<{ roomId: string; roomCode: string }>;
  joinRoom: (data: {
    roomId?: string;
    code?: string;
    password?: string;
  }) => Promise<{ roomId: string }>;
  leaveRoom: () => void;
  sendMessage: (content: string, type?: MessageType) => void;
  kickUser: (targetUserId: string) => Promise<void>;
  setDebateRole: (targetUserId: string, role: DebateRole) => Promise<void>;
  startDebate: (speakingTime: number) => Promise<void>;
  findRandomMatch: () => Promise<void>;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  connected: false,
  messages: [],
  currentRoom: null,
  roomState: null,

  connect: () => {
    const socket = io(import.meta.env.VITE_WS_URL || "http://localhost:3001", {
      auth: {
        token: localStorage.getItem("token")
      }
    });

    socket.on("connect", () => {
      set({ connected: true });
    });

    socket.on("disconnect", () => {
      set({ connected: false });
    });

    socket.on("message", (message: Message) => {
      set((state) => ({
        messages: [...state.messages, message]
      }));
    });

    socket.on("messages", (messages: Message[]) => {
      set({ messages });
    });

    socket.on("roomState", (state: RoomState) => {
      set({ roomState: state });
    });

    socket.on("kicked", ({ roomId }) => {
      if (get().currentRoom === roomId) {
        get().leaveRoom();
      }
    });

    socket.on("matchFound", ({ roomId }) => {
      set({ currentRoom: roomId });
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ 
        socket: null, 
        connected: false,
        messages: [],
        currentRoom: null,
        roomState: null
      });
    }
  },

  createRoom: (data) => {
    return new Promise((resolve, reject) => {
      const { socket } = get();
      if (!socket) {
        reject(new Error("Not connected"));
        return;
      }

      socket.emit("createRoom", data);
      
      socket.once("roomCreated", resolve);
      socket.once("error", reject);
    });
  },

  joinRoom: (data: {
    roomId?: string;
    code?: string;
    password?: string;
  }) => {
    return new Promise((resolve, reject) => {
      const { socket } = get();
      if (!socket) {
        reject(new Error("Not connected"));
        return;
      }

      socket.emit("joinRoom", data);
      
      socket.once("roomJoined", (roomData: { roomId: string }) => {
        set({ currentRoom: roomData.roomId });
        resolve(roomData);
      });
      socket.once("error", reject);
    });
  },

  leaveRoom: () => {
    const { socket, currentRoom } = get();
    if (socket && currentRoom) {
      socket.emit("leaveRoom");
      set({ 
        currentRoom: null,
        messages: [],
        roomState: null
      });
    }
  },

  sendMessage: (content, type = MessageType.TEXT) => {
    const { socket, currentRoom } = get();
    if (socket && currentRoom) {
      socket.emit("message", {
        content,
        roomId: currentRoom,
        type
      });
    }
  },

  kickUser: (targetUserId) => {
    return new Promise((resolve, reject) => {
      const { socket, currentRoom } = get();
      if (!socket || !currentRoom) {
        reject(new Error("Not connected or no room"));
        return;
      }

      socket.emit("kickUser", {
        roomId: currentRoom,
        targetUserId
      });
      
      socket.once("error", reject);
      resolve();
    });
  },

  setDebateRole: (targetUserId, role) => {
    return new Promise((resolve, reject) => {
      const { socket, currentRoom } = get();
      if (!socket || !currentRoom) {
        reject(new Error("Not connected or no room"));
        return;
      }

      socket.emit("setDebateRole", {
        roomId: currentRoom,
        targetUserId,
        role
      });
      
      socket.once("error", reject);
      resolve();
    });
  },

  startDebate: (speakingTime) => {
    return new Promise((resolve, reject) => {
      const { socket, currentRoom } = get();
      if (!socket || !currentRoom) {
        reject(new Error("Not connected or no room"));
        return;
      }

      socket.emit("startDebate", {
        roomId: currentRoom,
        speakingTime
      });
      
      socket.once("error", reject);
      resolve();
    });
  },

  findRandomMatch: () => {
    return new Promise((resolve, reject) => {
      const { socket } = get();
      if (!socket) {
        reject(new Error("Not connected"));
        return;
      }

      socket.emit("findRandomMatch");
      socket.once("error", reject);
      resolve();
    });
  }
})); 