/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { Room } from "../models/Room";

const router = express.Router();

// Create a chatroom
router.post("/create-room", async (req: any, res: any) => {
  const { name, password, type, createdBy } = req.body;
  const room = new Room({
    name,
    password,
    type,
    createdBy,
    participants: [createdBy],
  });
  await room.save();
  res.status(200).json({ message: "Room created", roomId: room._id });
});

// Join a chatroom
router.post("/join-room", async (req: any, res: any) => {
  const { roomId, password } = req.body;
  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ message: "Room not found" });
  if (room.password && room.password !== password)
    return res.status(401).json({ message: "Invalid password" });
  res.status(200).json({ message: "Joined room", room });
});

// Get all chatrooms
router.get("/rooms", async (req: any, res: any) => {
  const rooms = await Room.find();
  res.status(200).json({ rooms });
});

export default router;
