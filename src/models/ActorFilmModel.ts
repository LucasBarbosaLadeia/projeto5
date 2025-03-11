import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Importa a conexão com o banco

export class ActorFilmModel extends Model {
  public id_film!: number;
  public id_actor!: number;
  public film_date!: number;
}

ActorFilmModel.init(
  {
    id_film: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_actor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    film_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "atores_filmes",
    timestamps: false,
  }
);

export default ActorFilmModel;
