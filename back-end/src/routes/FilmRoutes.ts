import express from "express";
import {
  getAll,
  getFilmById,
  createFilm,
  updateFilm,
  destroyFilmById,
} from "../controller/FilmController";
import { authMiddleware } from "../validators/authMiddleware";
import { adminMiddleware } from "../validators/adminMiddleware";

import { getCommentsByFilmId } from "../controller/CommentController";

const router = express.Router();

router.get("/films", getAll, authMiddleware);
router.get("/films/:id", getFilmById, authMiddleware);
router.get("/films/:id/comments", getCommentsByFilmId, authMiddleware);
router.post("/films", createFilm, authMiddleware);
router.delete("/films/:id", adminMiddleware, adminMiddleware, destroyFilmById);
router.put("/films/:id", authMiddleware, updateFilm);

export default router;
