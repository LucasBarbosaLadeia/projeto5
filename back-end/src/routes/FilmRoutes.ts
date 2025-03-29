import express from "express";
import {
  getAll,
  getFilmById,
  createFilm,
  updateFilm,
} from "../controller/FilmController";
<<<<<<< HEAD
=======
import { authMiddleware } from "../validators/authMiddleware";
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7

const router = express.Router();

router.get("/films", getAll);
router.get("/films/:id", getFilmById);
router.post("/films", createFilm);
router.put("/films/:id", updateFilm);
<<<<<<< HEAD
<<<<<<<< HEAD:back-end/src/routes/FilmRoutes.ts
router.delete("/films/:id", updateFilm);
========
router.delete("/fims/:id", updateFilm);
>>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7:src/routes/FilmRoutes.ts

export default router;
=======
router.delete("/fims/:id", updateFilm);

export default router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkX3VzZXIiOjI4LCJuYW1lIjoiR2FicmllbCBTcGVjaWFtbSIsInBhc3N3b3JkIjoiJDJiJDEwJElpd291Mmo3VlMwWG9xblRaQnpQRGV2VlFJc1hNam1sdU1qczFzeWdTMVd2ODdBUnN0ODhhIiwiZW1haWwiOiJnYWJyaWVsU2FuY2hlc0BnbWFpbC5jb20iLCJlbmRlcmVjbyI6InJ1YSAxMzQzNDMyIiwiY3BmIjoiMTIzOTkwOTk5MzEifSwiaWF0IjoxNzQyOTQ2OTIxLCJleHAiOjE3NDM1NTE3MjF9.0nTqa9obUueLzmJzz2FQcsPk_lJpZQ39v7-oYwqa7_8
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
