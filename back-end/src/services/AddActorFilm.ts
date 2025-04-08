import { Sequelize } from "sequelize";
import FilmModel from "../models/FilmModel";
import ActorModel from "../models/ActorModel";

export async function addActorFilm(
  name: string,
  description: string,
  launch_date: Date,
  images: string,
  actorIds: number[]
) {
  try {
    const newFilm = await FilmModel.create({
      name,
      description,
      launch_date,
      images,
    });

    const actors = await ActorModel.findAll({
      where: { id_actor: actorIds },
    });

    await newFilm.addActors(actors);

    console.log("Sucesso ao criar filme:");
    return newFilm;
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    throw new Error("Erro ao criar filme.");
  }
}
