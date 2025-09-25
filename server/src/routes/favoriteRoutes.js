import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favoriteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Must be logged in (buyer/agent/seller/admin)
router.get("/", protect, getFavorites);
router.post("/", protect, addFavorite);
router.delete("/", protect, removeFavorite);

export default router;
