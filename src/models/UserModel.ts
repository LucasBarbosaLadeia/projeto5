import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Importa a conexão com o banco

export class UserModel extends Model {
  public id_users!: number;
  public name!: string;
  public senha!: string;
  public email!: string;
  public endereco!: string;
}

UserModel.init(
  {
    id_users: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(255), // Armazena senhas criptografadas
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: true, // Pode ser nulo
    },
  },
  {
    sequelize, // Conexão com o banco de dados
    tableName: "users", // Nome da tabela no BD
    timestamps: false, // Se não houver `created_at` e `updated_at`
  }
);

export default UserModel;
