import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "Segredo_kkk";
const JWT_EXPIRATION = "7d";

export const generateToken = (user: UserModel): string => {
  return jwt.sign({ id: user.id_user, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
