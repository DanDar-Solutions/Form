import express from "express";
const router = express.Router();

import {
  allUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser
} from "../controller/userController.js";
// === USER ROUTES ===
router.get("/users", allUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUser);
router.post("/users/login", loginUser);

export default router;
 