import express from "express";
import { getAll, createFavorite, getOne } from "../controller/FavoritesController";

const router = express.Router();

router.get("/favorites", getAll);
router.post("/favorites", createFavorite)
router.get("/favorites/check", getOne);

export default router;
