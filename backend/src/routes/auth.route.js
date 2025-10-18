import express from "express";
import {
  login,
  logOut,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/signout", logOut);
router.put("/update-profile", protectRoute, updateProfile);
export default router;
