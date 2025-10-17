import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
