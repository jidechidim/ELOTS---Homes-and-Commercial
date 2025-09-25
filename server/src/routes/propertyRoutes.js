import express from "express";
import { createProperty, getProperties } from "../controllers/propertyController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getProperties);

// handle multiple file uploads (up to 5 images per property)
router.post("/", upload.array("images", 5), createProperty);

export default router;

import express from "express";
import { createProperty, getProperties } from "../controllers/propertyController.js";
import { upload } from "../config/cloudinary.js";
import { protect, requireSellerOrAgent } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Anyone can view properties
router.get("/", getProperties);

// Only logged-in sellers/agents can post
router.post(
  "/",
  protect, 
  requireSellerOrAgent, 
  upload.array("images", 5), 
  createProperty
);

export default router;
