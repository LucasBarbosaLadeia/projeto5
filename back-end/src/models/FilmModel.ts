import { DataTypes, Model } from "sequelize";
import ActorModel from "./ActorModel";
import sequelize from "../config/database";

class FilmModel extends Model {
  id_film!: number;
  launch_date!: Date;
  name!: string;
  description!: string;
  images!: string;

  declare film?: FilmModel;
  public setActors!: (actors: ActorModel[] | number[]) => Promise<void>;
  public addActors!: (actors: ActorModel[] | number[]) => Promise<void>;
  public getActors!: () => Promise<ActorModel[]>;
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
    sequelize,
    tableName: "films",
    timestamps: false,
  }
);



export default FilmModel;
