import { Request, Response } from "express";
import UserModel from "../models/UserModel";

// método que busca todos
export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

// método que busca por id
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);

  return res.json(user);
};

// método que cria usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = await UserModel.create({ name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
