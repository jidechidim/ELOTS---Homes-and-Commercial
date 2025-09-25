import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("ELOTS API running"));
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/favorites", favoriteRoutes);
// app.use("/api/messages", messageRoutes);

app.use(errorHandler);
export default app;
