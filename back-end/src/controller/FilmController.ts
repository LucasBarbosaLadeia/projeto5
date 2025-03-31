import e, { Request, Response } from "express";
import FilmModel from "../models/FilmModel";

export const getAll = async (req: Request, res: Response) => {
  const films = await FilmModel.findAll();
  res.send(films);
};

export const getFilmById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await FilmModel.findByPk(req.params.id);
  return res.json(user);
};

export const createFilm = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const film = await FilmModel.create({ name });
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const updateFilm = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }
    const film = await FilmModel.findByPk(req.params.id);
    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }
    film.name = name;
    await film.save();
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

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
