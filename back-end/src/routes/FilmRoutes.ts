import express from "express";
import {
  getAll,
  getFilmById,
  createFilm,
  updateFilm,

  destroyFilmById,



} from "../controller/FilmController";

const router = express.Router();

router.get("/films", getAll);
router.get("/films/:id", getFilmById);
router.post("/films", createFilm);
router.delete("/films/:id", destroyFilmById);
router.put("/films/:id", updateFilm);
router.delete("/films/:id", destroyFilmById);

export default router;
