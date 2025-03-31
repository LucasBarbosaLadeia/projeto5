import { addActorToFilmService } from "../services/AddFilmActor";
import ActorFilmModel from "../models/ActorFilmModel";
import { expect } from "chai";

// Mock da instância do modelo
class ActorFilmMock {
  static create = async (data: any) => {
    return {
      id_actor: data.id_actor,
      id_film: data.id_film,
      toJSON: () => ({ id_actor: data.id_actor, id_film: data.id_film }),
    } as any; // simulando a resposta esperada
  };
}

describe("addActorToFilmService", () => {
  it("should add an actor to a film", async () => {
    // Mockando a criação do relacionamento
    ActorFilmModel.create = ActorFilmMock.create;

    const actorId = 1;
    const filmId = 2;

    const result = await addActorToFilmService(actorId, filmId);

    expect(result.id_actor).to.equal(actorId);
    expect(result.id_film).to.equal(filmId);
  });

  it("should throw an error if the actor is already associated with the film", async () => {
    // Mockando a resposta de já existir a relação
    ActorFilmModel.findOne = async () => ({ id_actor: 1, id_film: 2 });

    const actorId = 1;
    const filmId = 2;

    try {
      await addActorToFilmService(actorId, filmId);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).to.equal(
          `A relação entre ator (ID: ${actorId}) e filme (ID: ${filmId}) já existe.`
        );
      } else {
        throw error; // Re-throw if it's not an instance of Error
      }
    }
  });
});
