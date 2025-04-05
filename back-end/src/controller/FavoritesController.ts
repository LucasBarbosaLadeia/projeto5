import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
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
