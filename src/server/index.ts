/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { createServer } from "http";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import "./config";
const app = express();
const httpServer = createServer(app);

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

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 WebSocket server ready`);
});
