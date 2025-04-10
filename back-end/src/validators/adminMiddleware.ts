import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.admin) {
    return res
      .status(403)
      .json({ message: "Acesso negado: administrador apenas." });
  }
  next();
};
