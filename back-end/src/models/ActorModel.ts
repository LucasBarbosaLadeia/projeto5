import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Aqui, use o caminho correto para a configuração do sequelize

class ActorModel extends Model {
  id_actor!: number;
  name!: string;
  age!: number;
  nationality!: string;
}

ActorModel.init(
  {
    id_actor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "actors",
    timestamps: false,
  }
);

export default ActorModel;
