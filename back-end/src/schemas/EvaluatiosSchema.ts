import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const evaluationsSchema = z.object({
  comment: z.string().min(1, "Comentário não pode estar vazio"),
  film_id: z.number().min(1, "ID do filme é obrigatório"),
});

export const validateEvaluation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    evaluationsSchema.parse({
      comment: req.body.comment,
      film_id: Number(req.params.id),
    });

    next();
  } catch (error) {
    return res.status(400).json({
      message: error instanceof z.ZodError ? error.errors : "Erro na validação",
    });
  }
};
