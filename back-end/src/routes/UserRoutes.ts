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

<<<<<<< HEAD
router.post("/", createUser);
router.get("/", getAll);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, destroyUserById);
=======
router.post("/users", createUser);

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, destroyUserById);
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7

export default router;
//
