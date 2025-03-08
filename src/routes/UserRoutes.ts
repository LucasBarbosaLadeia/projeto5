import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
} from "../controller/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", updateUser);

export default router;