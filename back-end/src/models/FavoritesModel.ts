import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";
import FilmModel from "./FilmModel";

export class FavoritesModel extends Model {
  public id_favorito!: number;
  public id_user!: number;
  public id_film!: number;
  declare film?: FilmModel;
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
      type: DataTypes.INTEGER,
      primaryKey: false,
      allowNull: false,
    },
    id_film: {
      type: DataTypes.INTEGER,
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
  foreignKey: "id_film",
  as: "film",
});

FavoritesModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  as: "users",
});

export default FavoritesModel;
