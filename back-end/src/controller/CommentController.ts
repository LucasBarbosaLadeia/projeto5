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
  const { comment } = req.body;
  const { id } = req.params;
  const id_user = req.user.user.id_user;
  try {
    console.log("Recebendo dados para salvar:", { id, comment, id_user });
    const newComment = await addCommentToFilm(Number(id), comment, id_user);
    res.status(201).json({
      message: "Comentário adicionado com sucesso!",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const updateCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    await EvaluationsModel.update({ comment }, { where: { id } });
    res.status(200).json({ message: "Comentário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await EvaluationsModel.destroy({ where: { id } });
    res.status(200).json({ message: "Comentário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
