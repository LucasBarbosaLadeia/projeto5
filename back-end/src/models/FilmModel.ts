import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize"

export class FilmModel extends Model {
    public id_film!: number;
    public film_name!: string;
    public descripition!: string;
    public images!: string;
}

FilmModel.init(
    {
        id_film: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        name_film: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        images: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
    },
    {
      sequelize,
      tableName: "films", 
      timestamps: false, 
    }
);

export default FilmModel;
