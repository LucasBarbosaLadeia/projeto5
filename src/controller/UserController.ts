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

// método que cria um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, senha, endereco, email } = req.body;
    if (
      !name ||
      !senha ||
      !endereco ||
      !email ||
      name === "" ||
      senha === "" ||
      endereco === "" ||
      email === ""
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verificar se já existe um usuário com o mesmo e-mail
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Já existe um usuário com esse e-mail" });
    }

    // Criar um novo usuário
    const newUser = await UserModel.create({
      name,
      senha,
      endereco,
      email,
    });

    res.status(201).json(newUser); // Retornar o usuário criado com status 201
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", message: error });
  }
};

// método que atualiza um usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

// método que destrói
export const destroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
