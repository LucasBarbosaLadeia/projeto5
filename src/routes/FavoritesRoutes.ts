import express from "express";
import { getAll } from "../controller/FavoritesController";

const router = express.Router();

router.get("/favorites", getAll);

export default router;
