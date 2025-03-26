import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Definir o esquema de validação com Zod
const evaluationsSchema = z.object({
  film_id: z.number().min(1, "ID do filme é obrigatório"),
  comment: z.string().min(1, "Comentário não pode estar vazio"),
  autor: z.string().min(1, "Autor não pode estar vazio"),
  id_user: z.number().min(1, "ID do usuário é obrigatório"),
});

export const validateEvaluation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validar o corpo da requisição com o esquema Zod
    evaluationsSchema.parse({
      film_id: Number(req.params.id), // Pegando o film_id diretamente dos parâmetros
      comment: req.body.comment || req.body.comentario, // Pegando o comentário
      autor: `User ${req.user.user.id_user}`, // Pegando o autor do req.user
      id_user: req.user.user.id_user, // Pegando o id_user do req.user
    });

    // Se a validação passar, chama o próximo middleware ou controlador
    next();
  } catch (error) {
    // Caso ocorra erro de validação, retorna a mensagem de erro
    return res.status(400).json({
      message:
        error instanceof z.ZodError
          ? error.errors
          : "Erro na validação dos dados",
    });
  }
};

export default validateEvaluation;
