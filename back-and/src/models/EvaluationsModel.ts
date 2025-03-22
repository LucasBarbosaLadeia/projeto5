import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FilmModel from "./FilmModel";
import UserModel from "./UserModel";

export class EvaluationsModel extends Model {
  public id_film!: number;
  public id_actor!: number;
  public movie_review!: number;
  public comment!: string;
  public date_review!: Date;
}

EvaluationsModel.init(
  {
    id_evaluation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    movie_review: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_review: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "evaluations",
    timestamps: false,
  }
);

// Relacionamento: Uma avaliação pertence a um filme
EvaluationsModel.belongsTo(FilmModel, {
  foreignKey: "id_film", // Definindo a chave estrangeira correta
  as: "films", // Nome da relação
});

EvaluationsModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  as: "usues",
});

export default EvaluationsModel;
