import { Request, Response } from "express";
import { updateUserService } from "../services/UserUpdate";
import UserModel from "../models/UserModel";
import { userSchema } from "../schemas/userSchema";
import { z } from "zod";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = userSchema.parse(req.body);
    const newUser = await UserModel.create(userData);
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password, cpf } = req.body;
    const userId = req.params.id;
    const authenticatedUserId = req.user.id_user;

    const updatedUser = await updateUserService(userId, authenticatedUserId, {
      name,
      email,
      password,
      cpf,
    });

    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  } catch (error: any) {
    if (
      error.message === "Você só pode editar seus próprios dados" ||
      error.message === "Você não pode alterar seu e-mail"
    ) {
      return res.status(403).json({ error: error.message });
    }

    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
