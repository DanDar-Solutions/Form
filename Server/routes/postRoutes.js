
import express from "express";
const router = express.Router();

import {
  allUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controller/userController.js";

// === USER ROUTES ===
router.get("/post", allUsers);
router.get("/post/:id", getUser);
router.post("/post", createUser);
router.delete("/post/:id", deleteUser);
router.patch("/post/:id", updateUser);
export default router;
