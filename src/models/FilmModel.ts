import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import EvaluationsModel from "./EvaluationsModel";

export class FilmModel extends Model {
  public id_film!: number;
  public launch_date!: Date; //--------------------
  public name!: String;
  public description!: string;
  public images!: string;
}

FilmModel.init(
  {
    id_film: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    launch_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  },
  {
    sequelize, // Conexão com o banco de dados
    tableName: "films", // Nome da tabela no BD
    timestamps: false, // Se não houver created_at e updated_at
  }
);

export default FilmModel;
