import express from "express";

import {
  getAll,
  createFavorite,
  getOne,
} from "../controller/FavoritesController";
import { authMiddleware } from "../validators/authMiddleware";

const router = express.Router();

router.get("/favorites", getAll);
router.post("/favorites", createFavorite);
router.get("/favorites/check", getOne);

export default router;
