/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = express.Router();
// Sign up route
router.post("/signup", async (req: any, res: any) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      isNewUser: true,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    // Return user data and token
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isNewUser: user.isNewUser,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

export default router;
