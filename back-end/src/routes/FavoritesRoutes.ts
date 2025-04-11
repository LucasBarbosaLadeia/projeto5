import express from "express";

import {
  getAll,
  addFavoriteController,
  getFavoriteFilmsByUserController,
  createFavorite,
  getOne,
} from "../controller/FavoritesController";
import { authMiddleware } from "../validators/authMiddleware";

const router = express.Router();

router.get("/favorites", authMiddleware, getAll);
router.get("/favorite-films", authMiddleware, getFavoriteFilmsByUserController);
router.post("/favorites/:id", authMiddleware, addFavoriteController);
router.post("/favorites", authMiddleware, createFavorite);
router.get("/favorites/check", authMiddleware, getOne);

export default router;
