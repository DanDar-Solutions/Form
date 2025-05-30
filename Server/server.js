import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// CORS settings
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost"],
};
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// mongoDB connect
try {
  connectDB();
} catch (error) {
  console.log("MongoDB connection failed, but server will continue running");
}

// API routes
app.use("/api", routes);

// start Server
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
