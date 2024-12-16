import express from "express";
import { createServer } from "http";
import authRoutes from "./routes/auth";
import roomRoutes from "./routes/room";
import mongoose from "mongoose";
import "./config";
import { Server } from "socket.io";

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
app.use("/rooms", roomRoutes);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 WebSocket server ready`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
