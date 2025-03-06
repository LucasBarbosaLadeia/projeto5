import express from "express";
import { getAll, getUserById, createUser } from "../controller/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);

export default router;
