import express from "express";
import dotenv from "dotenv";
import aurthRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();

const port = process.env.PORT;

app.use("/api/auth/", aurthRoutes);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../forntend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(apth.join(__dirname, "../frontend", "dist", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`server is running on port: http://localhost:${port}`);
});
