import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import router from "./routes/routes.js";


dotenv.config();
const app = express();


const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost"],
};
app.use(cors(corsOptions));


const port = process.env.PORT || 8800;
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to the Server");
});

app.get("/api", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api", router);


app.listen(port, () => {
  try {
   connectDB();
  } catch (error) {
    console.log("MongoDB connection failed, but server will continue running");
  }
  console.log(`Server started on port: ${port}`);
});



 