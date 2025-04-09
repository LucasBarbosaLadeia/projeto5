import { NextFunction, Response, Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
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
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.admin) {
    return res.status(403).json({ error: "Acesso negado" });
  }
  next();
};
