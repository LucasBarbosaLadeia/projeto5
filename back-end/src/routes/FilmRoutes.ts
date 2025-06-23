import express from "express";
import {
  getAll,
  getFilmById,
  createFilm,
  updateFilm,
  destroyFilmById,
} from "../controller/FilmController";
import { authMiddleware } from "../validators/authMiddleware";

import { getCommentsByFilmId } from "../controller/CommentController";

const router = express.Router();



router.get("/films", authMiddleware, getAll);
router.get("/films/:id", authMiddleware, getFilmById);
router.get("/films/:id/comments", authMiddleware, getCommentsByFilmId);
router.post("/films", authMiddleware, createFilm);

router.delete("/films/:id", authMiddleware, destroyFilmById);
router.put("/films/:id", authMiddleware, updateFilm);

export default router;
