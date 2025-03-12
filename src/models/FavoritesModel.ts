import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class FavoritesModel extends Model {
  public id_favorito!: number;
  public id_users!: number;
  public id_film!: number;
}

FavoritesModel.init(
  {
    id_favorito: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_users: {
      type: DataTypes.INTEGER, // Perguntar para o professor se é auto increment
      primaryKey: false,
      allowNull: false,
    },
    id_film: {
      type: DataTypes.INTEGER, // Perguntar para o professor se é auto increment
      primaryKey: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "favorites",
    timestamps: false,
  }
);

export default FavoritesModel;
