import { Request, Response } from "express";
import ActorModel from "../models/ActorModel";
import { actorSchema } from "../schemas/ActorSchema";
import { z } from "zod";

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const actors = await ActorModel.findAll();
  res.send(actors);
};

// método que busca por id
export const getActorById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await ActorModel.findByPk(req.params.id);

  return res.json(user);
};

// método que cria um novo ator
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

// método que atualiza um usuário
export const updateActor = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
      const actorData = actorSchema.parse(req.body);

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

// método que destrói
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
