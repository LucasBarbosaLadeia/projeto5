import { Request, Response } from "express";
import FilmModel from "../models/FilmModel";

import { addActorFilm } from "../services/AddActorFilm";

import { z } from "zod";
import { filmSchema } from "../schemas/FilmSchema";

export const getAll = async (req: Request, res: Response) => {
  try {
    const films = await FilmModel.findAll();
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
    const film = await FilmModel.findByPk(req.params.id);
    if (!film) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }
    return res.status(200).json(film);
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    res.status(500).json({ error: "Erro ao buscar filme." });
  }
};

export const createFilm = async (req: Request, res: Response) => {
  try {
    const filmData = filmSchema.parse(req.body);
    const newFilm = await FilmModel.create(filmData);

    return res
      .status(201)
      .json({ message: "filme criado com sucesso", user: newFilm });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Erro interno no servidor " + error });
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
    film.name = name;

    await film.save();
    res.status(200).json(film);
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

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
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
