import express from "express";
import { login, logOut, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/signout", logOut);
export default router;
