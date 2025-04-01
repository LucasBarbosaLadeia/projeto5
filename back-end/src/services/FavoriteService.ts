import { error } from "console";
import FavoritesModel from "../models/FavoritesModel";
import FilmModel from "../models/FilmModel";

export const addFavoriteToUser = async (filmId: number, userId: number) => {
  try {
    console.log("Recebendo dados para favoritar:", { userId, filmId });

    const film = await FilmModel.findByPk(filmId);
    if (!film) {
      throw new Error("Filme não encontrado");
    }

    const existingFavorite = await FavoritesModel.findOne({
      where: { id_users: userId, id_film: filmId },
    });

    if (existingFavorite) {
      return {
        status: 400,
        data: { message: "Esse filme já está nos seus favoritos." },
      };
    }
    const newFavorite = await FavoritesModel.create({
      id_users: userId,
      id_film: filmId,
    });

    return newFavorite;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao favoritar filme");
  }
};
