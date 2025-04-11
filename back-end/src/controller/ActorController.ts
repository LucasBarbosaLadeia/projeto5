import { Request, Response } from "express";
import ActorModel from "../models/ActorModel";
import { actorSchema, updateActorSchema } from "../schemas/ActorSchema";
import { addActorToFilmService } from "../services/AddFilmActor";
import { z } from "zod";

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const actors = await ActorModel.findAll();
    return res.json(actors);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar atores: " + error });
  }
};

export const getActorById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const actor = await ActorModel.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "Ator não encontrado" });
    }
    return res.json(actor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar ator: " + error });
  }
};

export const createActor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const actorData = actorSchema.parse(req.body);
    const newActor = await ActorModel.create(actorData);
    return res
      .status(201)
      .json({ message: "Ator criado com sucesso", actor: newActor });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Erro ao criar ator: " + error });
  }
};

export const updateActor = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
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
    return res.status(500).json({ error: "Erro ao atualizar ator: " + error });
  }
};

export const destroyActorById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const actor = await ActorModel.findByPk(req.params.id);

    if (!actor) {
      return res.status(404).json({ error: "Ator não encontrado" });
    }

    await actor.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar ator: " + error });
  }
};

export const addActorToFilm = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { actorId, filmId }: { actorId: number; filmId: number } = req.body;

    if (!actorId || !filmId || isNaN(actorId) || isNaN(filmId)) {
      return res
        .status(400)
        .json({ message: "IDs de ator e filme devem ser números válidos." });
    }

    const actorFilm = await addActorToFilmService(actorId, filmId);
    return res.status(201).json({
      message: "Ator adicionado ao filme com sucesso!",
      actorFilm,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao adicionar ator ao filme: " + error });
  }
};