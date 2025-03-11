import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class EvaluationsModel extends Model {
  public id_film!: number;
  public id_actor!: number;
  public movie_review!: number;
  public comment!: string;
  public date_review!: Date;
}

EvaluationsModel.init(
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

export default EvaluationsModel;
