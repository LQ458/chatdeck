import "./config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();

// Debug middleware
app.use((req, res, next) => {
  console.log(" Incoming request:", {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
  });
  next();
});

app.use(express.json());

const mongoUri = process.env.VITE_MONGODB_URI;
if (!mongoUri) {
  throw new Error("VITE_MONGODB_URI environment variable is not defined");
}

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Routes
app.use("/auth", authRoutes);

// 404 handler with debug info
app.use((req, res) => {
  console.log("❌ 404 Not Found:", {
    method: req.method,
    url: req.url,
    body: req.body,
  });
  res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // Listen on all available network interfaces

// More detailed server startup logging
const server = app.listen(PORT as number, HOST, () => {
  console.log(`
🚀 Server is running!
📡 Host: ${HOST}
📡 Port: ${PORT}
🌐 URLs: 
   - Local: http://localhost:${PORT}
   - Network: http://${HOST}:${PORT}
🛣️  Available routes:
   POST /auth/signup

💡 Debug Info:
   - Process ID: ${process.pid}
   - Node Version: ${process.version}
   - Platform: ${process.platform}
  `);
});

// Handle server errors
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `❌ Port ${PORT} is already in use. Please try another port.`,
    );
  } else {
    console.error("❌ Server error:", error);
  }
  process.exit(1);
});

// Handle process termination
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
