import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";
import FavoriteService from "../services/FavoriteService";

export const getAll = async (req: Request, res: Response) => {
  const favorites = await FavoritesModel.findAll();
  res.send(favorites);
};

export const addFavorite = async (
  req: Request<{ id_film: string }>,
  res: Response
) => {
  try {
    const id_users = req.user.id;
    const { id_film } = req.params;
    const newFavorite = await FavoriteService.addFavorite(
      id_users,
      Number(id_film)
    );
    res.status(201).json({
      message: "Filme adicionado aos favoritos com sucesso!",
      favorite: newFavorite,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
