// import express from "express";
// import { Room } from "../models/Room";
// import { authMiddleware } from "../middleware/auth";

// const router = express.Router();

// // 创建房间
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { name, password } = req.body;
//     const room = new Room({
//       name,
//       password: password || undefined,
//       createdBy: req.user.userId,
//       participants: [req.user.userId],
//     });
//     await room.save();
//     res.status(201).json({ id: room._id.toString() });
//   } catch (error) {
//     console.error("Error creating room:", error);
//     res.status(500).json({ message: "Failed to create room" });
//   }
// });

// // 获取房间列表
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const rooms = await Room.find({ status: "active" })
//       .populate("createdBy", "name")
//       .populate("participants", "name");
//     res.json(rooms);
//   } catch (error) {
//     console.error("Error fetching rooms:", error);
//     res.status(500).json({ message: "Failed to fetch rooms" });
//   }
// });

// // 获取单个房间
// router.get("/:id", authMiddleware, async (req, res): Promise<void> => {
//   try {
//     const room = await Room.findById(req.params.id)
//       .populate("createdBy", "name")
//       .populate("participants", "name");
    
//     if (!room) {
//       res.status(404).json({ message: "Room not found" });
//       return;
//     }
    
//     res.json(room);
//   } catch (error) {
//     console.error("Error fetching room:", error);
//     res.status(500).json({ message: "Failed to fetch room" });
//   }
// });

// // 删除房间
// router.delete("/:id", authMiddleware, async (req, res): Promise<void> => {
//   try {
//     const room = await Room.findById(req.params.id);
    
//     if (!room) {
//       res.status(404).json({ message: "Room not found" });
//       return;
//     }

//     if (room.createdBy.toString() !== req.user.userId) {
//       res.status(403).json({ message: "Not authorized" });
//       return;
//     }

//     await Room.findByIdAndUpdate(req.params.id, { status: "inactive" });
//     res.json({ message: "Room deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting room:", error);
//     res.status(500).json({ message: "Failed to delete room" });
//   }
// });

// export default router; 