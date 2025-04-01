import { Request, Response } from "express";
import ActorFilmModel from "../models/ActorFilmModel";

export const getAll = async (req: Request, res: Response) => {
  const actorsFilms = await ActorFilmModel.findAll(); // Busca os registros no banco
  res.send(actorsFilms);
};

export const getActorFilmById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const film = await ActorFilmModel.findByPk(req.params.id);
  return res.json(getActorFilmById);
};
