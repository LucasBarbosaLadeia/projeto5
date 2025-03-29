import { NextFunction, Response, Request } from "express";
<<<<<<< HEAD
=======

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("token", token);

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = verifyToken(token);
<<<<<<< HEAD
    req.body.user = decoded;
=======
    req.user = decoded;
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
