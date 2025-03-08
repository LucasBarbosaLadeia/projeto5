<<<<<<< HEAD
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Importa a conexão com o banco

export class UserModel extends Model {
  public id_usuario!: number;
  public name!: string;
  public senha!: string;
  public email!: string;
  public endereco!: string;
}

UserModel.init(
  {
    id_usuario: {
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: true, // Pode ser nulo
    },
  },
  {
    sequelize, // Conexão com o banco de dados
    tableName: "usuarios", // Nome da tabela no BD
    timestamps: false, // Se não houver `created_at` e `updated_at`
  }
);

export default UserModel;
=======
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Importa a conexão com o banco

export class UserModel extends Model {
  public id_usuario!: number;
  public name!: string;
  public senha!: string;
  public email!: string;
  public endereco!: string;
}

UserModel.init(
  {
    id_usuario: {
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: true, // Pode ser nulo
    },
  },
  {
    sequelize, // Conexão com o banco de dados
    tableName: "usuarios", // Nome da tabela no BD
    timestamps: false, // Se não houver `created_at` e `updated_at`
  }
);

export default UserModel;
>>>>>>> 31eb1faf6aeb4217d2c6a415ba5b664c7c5134bc
