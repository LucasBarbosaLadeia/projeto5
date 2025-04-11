import { Request, Response } from "express";
import EvaluationsModel from "../models/EvaluationsModel";
import { addCommentToFilm } from "../services/AddCommentFilm";

export const getAll = async (req: Request, res: Response) => {
  try {
    const evaluations = await EvaluationsModel.findAll();
    res.status(200).json(evaluations);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    res.status(500).json({ message: "Erro interno ao buscar avaliações." });
  }
};

export const getEvaluationById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const evaluation = await EvaluationsModel.findByPk(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ message: "Comentário não encontrado." });
    }
    return res.status(200).json(evaluation);
  } catch (error) {
    console.error("Erro ao buscar avaliação:", error);
    res.status(500).json({ message: "Erro interno ao buscar avaliação." });
  }
};

export const addCommentController = async (req: Request, res: Response) => {
  const { comment } = req.body;
  const { id } = req.params;
  const id_user = req.user?.id_user;

  try {
    if (!comment) {
      return res.status(400).json({ message: "Comentário é obrigatório." });
    }

    const newComment = await addCommentToFilm(Number(id), comment, id_user);
    res.status(201).json({
      message: "Comentário adicionado com sucesso!",
      comment: newComment,
    });
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao adicionar comentário.",
    });
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const updated = await EvaluationsModel.update(
      { comment },
      { where: { id_evaluation: id } }
    );

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Comentário não encontrado para atualização." });
    }

    res.status(200).json({ message: "Comentário atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao atualizar comentário.",
    });
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await EvaluationsModel.destroy({
      where: { id_evaluation: id },
    });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: "Comentário não encontrado para exclusão." });
    }

    res.status(200).json({ message: "Comentário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "Erro ao deletar comentário.",
    });
  }
};

export const getCommentsByFilmId = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const comments = await EvaluationsModel.findAll({
      where: { film_id: id },
    });

    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum comentário encontrado para este filme." });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários do filme:", error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao buscar comentários do filme.",
    });
  }
};
