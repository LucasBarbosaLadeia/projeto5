import express from "express";
import {
  getAll,
  getFilmById,
  createFilm,
  updateFilm,
} from "../controller/FilmController";

const router = express.Router();

router.get("/films", getAll);
router.get("/films/:id", getFilmById);
router.post("/films", createFilm);
router.put("/films/:id", updateFilm);
router.delete("/fims/:id", updateFilm);

export default router;