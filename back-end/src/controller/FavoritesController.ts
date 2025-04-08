import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";

import { addFavoriteToUser } from "../services/FavoriteService";
import FilmModel from "../models/FilmModel";

import { z } from "zod";



export const createFavorite = async (req: Request, res: Response) => {
  try {
    console.log("Body recebido:", req.body);
    const { id_user, id_film } = req.body;

    // Simples verificação básica
    if (!id_user || !id_film) {
      return res.status(400).json({ error: "id_user e film_id são obrigatórios" });
    }

    const newFavorite = await FavoritesModel.create({ id_user, id_film});

    return res.status(201).json({
      message: "Favorito criado com sucesso",
      favorite: newFavorite,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + error });
  }
};


export const getAll = async (req: Request, res: Response) => {
  const favorites = await FavoritesModel.findAll();
  res.send(favorites);
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id_user, id_film } = req.query;

    if (!id_user || !id_film) {
      return res.status(400).json({ error: "id_user e id_film são obrigatórios" });
    }

    const favorite = await FavoritesModel.findOne({
      where: {
        id_user: Number(id_user),
        id_film: Number(id_film),
      },
    });

    if (favorite) {
      return res.status(200).json({ favorited: true });
    } else {
      return res.status(200).json({ favorited: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + error });
  }
};


