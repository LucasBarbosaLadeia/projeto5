import express from "express";

import { getAll, createFavorite, getOne } from "../controller/FavoritesController";


import { authMiddleware } from "../validators/authMiddleware";

import { getAll, createFavorite } from "../controller/FavoritesController";



const router = express.Router();

router.get("/favorites", getAll);

router.get("/favorite-films", authMiddleware, getFavoriteFilmsByUserController);
router.post("/favorites/:id", authMiddleware, addFavoriteController);

router.post("/favorites", createFavorite)
router.get("/favorites/check", getOne);


export default router;
