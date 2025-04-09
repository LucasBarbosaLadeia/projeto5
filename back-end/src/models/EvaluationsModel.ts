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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FilmModel,
        key: "id_film",
      },
    },
    id_user: {
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

EvaluationsModel.belongsTo(FilmModel, {
  foreignKey: "film_id",
  as: "film",
});

EvaluationsModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  as: "user",
});

export default EvaluationsModel;
