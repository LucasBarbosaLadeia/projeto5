import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FilmModel from "./FilmModel";
import ActorModel from "./ActorModel";

export class ActorFilmModel extends Model {
  public id_film!: number;
  public id_actor!: number;
}

// Inicialização da tabela intermediária
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
    tableName: "atores_filmes",
    timestamps: false, // Se precisar registrar data de associação, remova isso e adicione createdAt e updatedAt
  }
);

// Definição do relacionamento muitos-para-muitos
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
