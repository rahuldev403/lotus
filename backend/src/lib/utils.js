import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // For cross-site cookies (Vercel -> Render), sameSite must be 'none' and secure must be true
    sameSite: ENV.NODE_ENV === "development" ? "lax" : "none",
    secure: ENV.NODE_ENV !== "development",
  });
};
