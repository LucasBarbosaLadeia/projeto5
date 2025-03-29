import { Request, Response } from "express";
import ActorModel from "../models/ActorModel";
<<<<<<< HEAD
=======
import { actorSchema } from "../schemas/ActorSchema";
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7

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
<<<<<<< HEAD
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const actor = await ActorModel.create({ name });
    res.status(201).json(actor);
=======
    const actor = actorSchema.parse(req.body);
    const newActor = await ActorModel.create(actor);

    return res
      .status(201)
      .json({ message: "Ator criado com sucesso", actor: newActor });
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
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
<<<<<<< HEAD
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

=======
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
    const actor = await ActorModel.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "actor not found" });
    }

<<<<<<< HEAD
    actor.name = name;

=======
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
    await actor.save();
    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
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
