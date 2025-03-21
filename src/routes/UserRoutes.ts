import express from "express";

import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  destroyUserById,
} from "../controller/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/users", createUser);

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, destroyUserById);

export default router;
