import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Importa a conexão com o banco
import FilmModel from "./FilmModel";
import ActorModel from "./ActorModel"; // Supondo que exista um modelo para atores

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

// ✅ Correção: Relacionamento correto entre Film e Actor usando ActorFilmModel
FilmModel.belongsToMany(ActorModel, {
  through: ActorFilmModel, // Define a tabela intermediária
  foreignKey: "id_film",
  otherKey: "id_actor",
  as: "actors",
});

ActorModel.belongsToMany(FilmModel, {
  through: ActorFilmModel, // Define a tabela intermediária
  foreignKey: "id_actor",
  otherKey: "id_film",
  as: "films",
});

export default ActorFilmModel;
