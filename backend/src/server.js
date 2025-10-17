import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { ENV } from "./lib/env.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();

const port = ENV.PORT || 3000;

app.use("/api/auth/", authRoutes);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`🚀 server is running on port: http://localhost:${port}`);
  connectDB();
});
