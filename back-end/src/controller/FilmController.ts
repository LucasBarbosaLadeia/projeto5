import { Request, Response } from "express";
import FilmModel from "../models/FilmModel";
import { addActorFilm } from "../services/AddActorFilm";

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
  const { name, description, launch_date, images, actorIds } = req.body;

  try {
    const newFilm = await addActorFilm(
      name,
      description,
      launch_date,
      images,
      actorIds
    );
    return res.status(201).json(newFilm);
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    res.status(500).json({ error: "Erro ao criar filme." });
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
