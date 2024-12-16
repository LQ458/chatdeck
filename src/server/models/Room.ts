import mongoose from "mongoose";
import { RoomType } from "../types";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(RoomType),
    default: RoomType.PRIVATE,
  },
  code: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  settings: {
    maxParticipants: Number,
    speakingTime: Number, // for debate rooms
    allowSpectators: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Room = mongoose.model("Room", roomSchema);
