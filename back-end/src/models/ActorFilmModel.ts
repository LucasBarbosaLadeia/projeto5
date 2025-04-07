import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Aqui, use o caminho correto para a configuração do sequelize
import FilmModel from "./FilmModel";
import ActorModel from "./ActorModel";

class ActorFilmModel extends Model {
  id_film!: number;
  id_actor!: number;
}

ActorFilmModel.init(
  {
    id_film: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: FilmModel,
        key: "id_film",
      },
    },
    id_actor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: ActorModel,
        key: "id_actor",
      },
    },
  },
  {
    sequelize,
    tableName: "actor_film", // Pode ser outro nome de tabela se você quiser
    timestamps: false,
  }
);

FilmModel.belongsToMany(ActorModel, {
  through: "actor_films", // Nome da tabela intermediária
  as: "actors",
  foreignKey: "film_id",
});

ActorModel.belongsToMany(FilmModel, {
  through: "actor_films",
  as: "films",
  foreignKey: "actor_id",
});

export default ActorFilmModel;
