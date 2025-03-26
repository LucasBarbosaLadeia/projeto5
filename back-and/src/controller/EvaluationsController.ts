import { Request, Response } from "express";
import EvaluationsModel from "../models/EvaluationsModel";
import { addCommentToFilm } from "../services/AddCommentFilm";

export const getAll = async (req: Request, res: Response) => {
  const evaluations = await EvaluationsModel.findAll();
  res.send(evaluations);
};

export const getEvaluationById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const evaluation = await EvaluationsModel.findByPk(req.params.id);

  return res.json(evaluation);
};

export const addCommentController = async (req: Request, res: Response) => {
  try {
    // Extraindo o ID do filme, o comentário e o usuário da requisição
    const film_id = Number(req.params.id); // ID do filme que está na URL
    const comment = req.body.comment || req.body.comentario; // Comentário enviado no corpo da requisição
    const user = req.user.user.id_user; // ID do usuário do `req.user` (provavelmente vindo de um middleware de autenticação)

    // Verificando se os dados necessários estão presentes
    if (!film_id || !comment || !user) {
      return res.status(400).json({ error: "Faltam dados necessários." });
    }

    // Adicionando a data da revisão (date_review)
    const dateReview = new Date(); // Data atual

    // Adicionando o comentário ao filme
    const newComment = await addCommentToFilm(film_id, {
      comment,
      autor: `User ${user}`,
      id_users: user,
      date_review: dateReview, // Incluindo a data da revisão
    });

    // Retornando a resposta com o comentário adicionado
    return res.status(201).json({
      message: "Comentário adicionado com sucesso",
      comment: newComment,
    });
  } catch (error) {
    // Tratamento de erro
    console.error("Erro ao adicionar comentário:", error);
    return res.status(500).json({
      message: "Erro interno ao adicionar comentário",
    });
  }
};
