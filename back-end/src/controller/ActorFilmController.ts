import { Request, Response } from "express";
import ActorFilmModel from "../models/ActorFilmModel";
import ActorModel from "../models/ActorModel";
import FilmModel from "../models/FilmModel";

// GET /actors-films
export const getAll = async (req: Request, res: Response) => {
  try {
    const actorsFilms = await ActorFilmModel.findAll({
      include: [
        { model: ActorModel, as: "actor" },
        { model: FilmModel, as: "film" },
      ],
    });
    res.status(200).json(actorsFilms);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os vínculos." });
  }
};

// GET /actors-films/:id_film/:id_actor
export const getById = async (
  req: Request<{ id_film: string; id_actor: string }>,
  res: Response
) => {
  try {
    const { id_film, id_actor } = req.params;
    const relation = await ActorFilmModel.findOne({
      where: { id_film, id_actor },
      include: [
        { model: ActorModel, as: "actor" },
        { model: FilmModel, as: "film" },
      ],
    });

    if (!relation) {
      return res.status(404).json({ error: "Relação não encontrada." });
    }

    res.status(200).json(relation);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar a relação." });
  }
};

// POST /actors-films
