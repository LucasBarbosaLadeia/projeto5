import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  console.log(' recebido:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log(' recebido:', req.body);
    return res.status(400).json({ error: "Informe e-mail e senha" });
  }

  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Senha ou e-mail inválida" });
  }

  const token = generateToken(user);

  res.status(200).json({ message: "Usuário logado com sucesso", token });
};
