import express from "express";
import { getAll } from "../controller/UserController";

const router = express.Router();

router.get("/users", getAll);

export default router;
