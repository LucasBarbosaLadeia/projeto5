import ActorModel from "../models/ActorModel";
import FilmModel from "../models/FilmModel";
import ActorFilmModel from "../models/ActorFilmModel";

export const addActorToFilmService = async (
  actorId: number,
  filmId: number
): Promise<ActorFilmModel> => {
  console.log("Recebendo actorId:" + actorId + " e filmId:" + filmId);

  const actor = await ActorModel.findByPk(actorId);
  const film = await FilmModel.findByPk(filmId);

  if (!actor || !film) {
    throw new Error("Ator ou Filme não encontrado!");
  }

  const existingRelation = await ActorFilmModel.findOne({
    where: {
      id_actor: actorId,
      id_film: filmId,
    },
  });

  if (existingRelation) {
    throw new Error(
      `A relação entre ator (ID: ${actorId}) e filme (ID: ${filmId}) já existe.`
    );
  }

  const actorFilm = await ActorFilmModel.create({
    id_actor: actorId,
    id_film: filmId,
  });

  return actorFilm;
};
