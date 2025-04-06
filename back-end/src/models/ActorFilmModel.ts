import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
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
    tableName: "actor_film",
    timestamps: false,
  }
);

FilmModel.belongsToMany(ActorModel, {
  through: ActorFilmModel,
  foreignKey: "id_film",
  otherKey: "id_actor",
  as: "actors",
});

ActorModel.belongsToMany(FilmModel, {
  through: ActorFilmModel,
  foreignKey: "id_actor",
  otherKey: "id_film",
  as: "films",
});

export default ActorFilmModel;
