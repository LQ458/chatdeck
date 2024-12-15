/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user: {
    userId: string;
    iat: number;
    exp: number;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as AuthRequest["user"];

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        iat: number;
        exp: number;
      };
    }
  }
}
