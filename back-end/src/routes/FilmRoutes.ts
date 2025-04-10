import express from "express";
import {
  getAll,
  getFilmById,
  createFilm,
  updateFilm,
  destroyFilmById,
} from "../controller/FilmController";

import { getCommentsByFilmId } from "../controller/CommentController";

const router = express.Router();

router.get("/films", getAll);
router.get("/films/:id", getFilmById);
router.get("/films/:id/comments", getCommentsByFilmId); // Assuming this is the correct route for comments
router.post("/films", createFilm);
router.delete("/films/:id", destroyFilmById);
router.put("/films/:id", updateFilm);

export default router;
