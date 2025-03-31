import FavoritesModel from "../models/FavoritesModel";
import FilmModel from "../models/FilmModel";

class FavoriteService {
  static async addFavorite(id_user: number, id_film: number) {
    const film = await FilmModel.findByPk(id_film);
    if (!film) {
      throw new Error("Filme não encontrado");
    }
    const existingFavorite = await FavoritesModel.findOne({
      where: { id_user, id_film },
    });
    if (existingFavorite) {
      throw new Error("Filme já favoritado");
    }
    return await FavoritesModel.create({ id_user, id_film });
  }
}

export default FavoriteService;
