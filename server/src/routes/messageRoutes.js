import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { sendMessage } from "../controllers/messageController.js";
const router = Router();
router.post("/", protect, sendMessage);
export default router;
