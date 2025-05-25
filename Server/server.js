import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// CORS тохиргоо
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// MongoDB холболт
try {
  connectDB();
} catch (error) {
  console.log("MongoDB connection failed, but server will continue running");
}

// API route-ууд
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Сервер асгах
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
