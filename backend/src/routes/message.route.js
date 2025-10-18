import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllContacts,
  getChatPartners,
  getMessageByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;
