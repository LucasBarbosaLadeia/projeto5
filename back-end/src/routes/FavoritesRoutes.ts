import express from "express";
import { getAll, createFavorite } from "../controller/FavoritesController";

const router = express.Router();

router.get("/favorites", getAll);
router.post("/favorites", createFavorite)

export default router;
