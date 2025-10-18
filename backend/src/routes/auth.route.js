import express from "express";
import {
  login,
  logOut,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logOut);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", (req, res) => res.status(200).json(req.user));

export default router;
