import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FilmModel from "./FilmModel";
import UserModel from "./UserModel";

export class EvaluationsModel extends Model {
  public id_evaluation!: number;
  public id_user!: number;
  public film_id!: number;
  public comment!: string;
  public date_review!: Date;
}

EvaluationsModel.init(
  {
    id_evaluation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    film_id: {
      // Corrigido: mantivemos como film_id para consistência
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FilmModel,
        key: "id_film",
      },
    },
    id_user: {
      // Corrigido: mantivemos como id_user para consistência
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id_user",
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_review: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "evaluations",
    timestamps: false,
  }
);

// Relacionamento com o filme
EvaluationsModel.belongsTo(FilmModel, {
  foreignKey: "film_id", // Chave estrangeira film_id para o filme
  as: "film", // Relação com o filme
});

// Relacionamento com o usuário
EvaluationsModel.belongsTo(UserModel, {
  foreignKey: "id_user", // Chave estrangeira id_user para o usuário
  as: "user", // Relação com o usuário
});

export default EvaluationsModel;
