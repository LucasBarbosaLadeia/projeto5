import { Request, Response } from "express";
import FilmModel from "../models/FilmModel";
import ActorModel from "../models/ActorModel";
import { filmSchema } from "../schemas/FilmSchema";
import { z } from "zod";
import { addActorFilm } from "../services/AddActorFilm";

export const getAll = async (req: Request, res: Response) => {
  try {
    const films = await FilmModel.findAll({
      include: {
        model: ActorModel,
        as: "actors",
        through: { attributes: [] },
      },
    });

    res.status(200).json(films);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes." });
  }
};

export const getFilmById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const film = await FilmModel.findByPk(req.params.id, {
      include: { model: ActorModel, as: "actors" },
    });

    if (!film) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }

    res.status(200).json(film);
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    res.status(500).json({ error: "Erro ao buscar filme." });
  }
};

export const createFilm = async (req: Request, res: Response) => {
  try {
    const filmData = filmSchema.parse(req.body);

    const newFilm = await addActorFilm(filmData);

    return res.status(201).json({
      message: "Filme criado com sucesso",
      film: newFilm,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    return res
      .status(500)
      .json({ error: "Erro interno no servidor: " + error });
  }
};

export const updateFilm = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "O nome é obrigatório." });
    }

    const film = await FilmModel.findByPk(req.params.id);
    if (!film) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }
    await film.save();
    res.status(200).json(film);
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    res.status(500).json({ error: "Erro ao atualizar filme." });
  }
};

// Deletar
export const destroyFilmById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const film = await FilmModel.findByPk(req.params.id);
    if (!film) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }

    await film.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar filme:", error);
    res.status(500).json({ error: "Erro ao deletar filme." });
  }
};
