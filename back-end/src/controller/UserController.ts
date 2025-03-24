import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { z } from "zod";
import { cpfValidator } from "../validators/cpfValidator";

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
const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  endereco: z.string().min(1, "O endereço é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cpf: cpfValidator.or(z.string().min(11, "CPF inválido")),
});

const updateUserSchema = userSchema.partial();

export const createUser = async (req: Request, res: Response) => {
  console.log('Request Body:', req.body); 
  try {
    console.log(req.body);
    const userData = userSchema.parse(req.body);

    const newUser = await UserModel.create(userData);

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Erro interno no servidor " + error });
  }
};

// método que atualiza um usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const userData = updateUserSchema.parse(req.body);

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.set(userData);

    await user.save();
    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Erro interno no servidor " + error });
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

    res.status(200).json({ message: "Usuario deletado" + user });
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
