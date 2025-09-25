import express from "express";
import { createProperty, getProperties } from "../controllers/propertyController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getProperties);

// handle multiple file uploads (up to 5 images per property)
router.post("/", upload.array("images", 5), createProperty);

export default router;
