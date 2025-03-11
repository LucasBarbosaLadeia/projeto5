import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Certifique-se de importar sua instância do Sequelize

export class FilmeModel extends Model {
  public id_filme!: number;
  public nome!: string;
  public descricao!: string;
  public ano_lancamento!: number;
}

FilmeModel.init(
  {
    id_filme: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    ano_lancamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // Conexão com o banco de dados
    tableName: "filmes", // Nome da tabela
    timestamps: false, // Se não tiver `created_at` e `updated_at`
  }
);
