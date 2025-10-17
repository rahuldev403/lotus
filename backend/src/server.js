import express from "express";
import dotenv from "dotenv";
import aurthRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
dotenv.config();

const app = express();

const port = process.env.PORT;

app.use("/api/auth/", aurthRoutes);
app.use("/api/message", messageRoute);

app.listen(port, () => {
  console.log(`server is running on port: http://localhost:${port}`);
});
