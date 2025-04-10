import { Request, Response } from "express";
import ActorModel from "../models/ActorModel";
import { actorSchema, updateActorSchema } from "../schemas/ActorSchema";
import { addActorToFilmService } from "../services/AddFilmActor";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  const actors = await ActorModel.findAll();
  res.send(actors);
};

export const getActorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await ActorModel.findByPk(req.params.id);
  return res.json(user);
};

export const createActor = async (req: Request, res: Response) => {
  try {
    const actorData = actorSchema.parse(req.body);
    const newActor = await ActorModel.create(actorData);

    return res
      .status(201)
      .json({ message: "Ator criado com sucesso", actor: newActor });
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const updateActor = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const actorData = updateActorSchema.parse(req.body);

    const actor = await ActorModel.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "Ator não encontrado" });
    }

    actor.set(actorData);
    await actor.save();

    return res.status(200).json({ message: "Ator atualizado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

export const destroyActorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const actor = await ActorModel.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "actor not found" });
    }
    await actor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const addActorToFilm = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { actorId, filmId }: { actorId: number; filmId: number } = req.body;
    if (isNaN(actorId) || isNaN(filmId)) {
      return res
        .status(400)
        .json({ message: "Os IDs de ator e filme devem ser números válidos." });
    }
    if (!actorId || !filmId) {
      return res
        .status(400)
        .json({ message: "Ator e filme são obrigatórios." });
    }
    const actorFilm = await addActorToFilmService(actorId, filmId);
    return res.status(201).json({
      message: "Ator adicionado ao filme com sucesso!",
      actorFilm,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao adicionar ator ao filme" });
  }
};