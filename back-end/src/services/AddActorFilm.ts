// services/filmService.ts
import FilmModel from "../models/FilmModel";
import ActorModel from "../models/ActorModel";

interface FilmInput {
  name: string;
  description: string;
  launch_date: string;
  images: string;
  actorIds: number[];
}

export async function addActorFilm(filmData: FilmInput) {
  try {
    const { name, description, launch_date, images, actorIds } = filmData;

    const newFilm = await FilmModel.create({
      name,
      description,
      launch_date,
      images,
      actorIds: [],
    });

    const actors = await ActorModel.findAll({
      where: { id_actor: actorIds },
    });

    await newFilm.addActors(actors);

    return newFilm;
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    throw new Error("Erro ao criar filme.");
  }
}
