import { EvaluationsModel } from "../models/EvaluationsModel";

export const addCommentToFilm = async (
  filmId: number,
  comment: string,
  userId: number
) => {
  try {
    console.log("Recebendo dados para salvar:", { filmId, comment, userId });
    const newComment = await EvaluationsModel.create({
      film_id: filmId,
      comment: comment,
      id_user: userId,
      date_review: new Date(),
    });
    console.log("Comentário salvo com sucesso:", newComment);
    return newComment;
  } catch (error) {
    console.log(filmId, comment, userId, new Date());
    console.error("Erro ao salvar comentário:", error);
    throw new Error("Erro ao salvar comentário");
  }
};
