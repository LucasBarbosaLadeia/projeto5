import { Request, Response } from "express";
import FavoritesModel from "../models/FavoritesModel";

export const getAll = async (req: Request, res: Response) => {
  const favorites = await FavoritesModel.findAll();
  res.send(favorites);
};
