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
import fs from "fs";

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
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Lotus API is running",
    docs: "/api",
    endpoints: ["/api/auth", "/api/message"],
  });
});

// optional health endpoint for uptime checks
app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/auth/", authRoutes);
app.use("/api/message", messageRoute);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const distDir = path.join(__dirname, "../frontend", "dist");
  const indexHtml = path.join(distDir, "index.html");

  if (fs.existsSync(indexHtml)) {
    app.use(express.static(distDir));
    app.get("*", (_, res) => res.sendFile(indexHtml));
  } else {
    console.warn(
      `Frontend build not found at ${indexHtml}. Skipping static file serving.`
    );
  }
}

server.listen(port, () => {
  console.log(`🚀 server is running on port: http://localhost:${port}`);
  connectDB();
});
