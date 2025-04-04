import { Request, Response } from "express";
import FilmModel from "../models/FilmModel";
import { z } from "zod";
import { filmSchema } from "../schemas/FilmSchema";

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const films = await FilmModel.findAll();
  res.send(films);
};

// método que busca por id
export const getFilmById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await FilmModel.findByPk(req.params.id);

  return res.json(user);
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

// método que atualiza um usuário
export const updateFilm = async (
req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const film = await FilmModel.findByPk(req.params.id);
    if (!film) {
      return res.status(404).json({ error: "film not found" });
    }

    await film.save();
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que destrói
export const destroyFilmById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const film = await FilmModel.findByPk(req.params.id);
    if (!film) {
      return res.status(404).json({ error: "film not found" });
    }

    await film.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
