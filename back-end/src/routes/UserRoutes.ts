import express from "express";

import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  destroyUserById,
} from "../controller/UserController";
import { authMiddleware } from "../validators/authMiddleware";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAll);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, destroyUserById);

export default router;
//
