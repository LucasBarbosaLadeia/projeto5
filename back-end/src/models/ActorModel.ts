import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Importa a conexão com o banco

export class ActorModel extends Model {
  public id_actor!: number;
  public name!:String ;
  public age!: number;
  public nacionality!: string;
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
  allowNull: false
},
age: {
  type:DataTypes.INTEGER,
  allowNull: false
},
nacionality: {
 type: DataTypes.STRING(100),
 allowNull: false
},
},
{
  sequelize, 
  tableName: "actors", 
  timestamps: false, 
}
);

export default ActorModel;
