import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { ENV } from "./lib/env.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

const __dirname = path.resolve();
const port = ENV.PORT || 3000;

// Store online users
const onlineUsers = new Map(); // userId -> socketId

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    onlineUsers.set(userId, socket.id);
    // Broadcast online users to all connected clients
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }
  });
});

// Make io accessible to routes
app.set("io", io);
app.set("onlineUsers", onlineUsers);

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/message", messageRoute);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  );
}

server.listen(port, () => {
  console.log(`🚀 server is running on port: http://localhost:${port}`);
  connectDB();
});
