import { EvaluationsModel } from "../models/EvaluationsModel";

export const addCommentToFilm = async (
  filmId: number,
  commentData: {
    comment: string;
    autor: string;
    id_users: number;
    date_review: Date;
  }
) => {
  // Criando o comentário e salvando no banco de dados
  const comment = await EvaluationsModel.create({
    comment: commentData.comment,
    autor: commentData.autor,
    date_review: commentData.date_review,
    id_users: commentData.id_users,
    id_film: filmId,
  });

  // Retorna o comentário criado
  return comment;
};
