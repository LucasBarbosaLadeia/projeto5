import express from "express";

import {
  getAll,
  addFavoriteController,
  getFavoriteFilmsByUserController,
  createFavorite,
} from "../controller/FavoritesController";
import { authMiddleware } from "../validators/authMiddleware";

const router = express.Router();

router.get("/favorites", getAll);

router.get("/favorite-films", authMiddleware, getFavoriteFilmsByUserController);
router.post("/favorites/:id", authMiddleware, addFavoriteController);

router.post("/favorites", createFavorite);

export default router;
