import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import FilmModel from "./FilmModel";

export class FavoritesModel extends Model {
  public id_favorito!: number;
  public id_user!: number;
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
    id_user: {
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

FavoritesModel.belongsTo(FilmModel, {
  foreignKey: "id_film", // Definindo a chave estrangeira correta
  as: "films", // Nome da relação
});

FavoritesModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  as: "users",
});

export default FavoritesModel;
