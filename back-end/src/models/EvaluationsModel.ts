import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FilmModel from "./FilmModel";
import UserModel from "./UserModel";

export class EvaluationsModel extends Model {
<<<<<<< HEAD
  public id_film!: number;
  public id_actor!: number;
  public movie_review!: number;
=======
  public id_evaluation!: number;
  public id_user!: number;
  public film_id!: number;
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
  public comment!: string;
  public date_review!: Date;
}

EvaluationsModel.init(
  {
    id_evaluation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
<<<<<<< HEAD
    },
    movie_review: {
      type: DataTypes.INTEGER,
      allowNull: false,
=======
      autoIncrement: true,
    },
    film_id: {
      // Corrigido: mantivemos como film_id para consistência
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FilmModel,
        key: "id_film",
      },
    },
    id_user: {
      // Corrigido: mantivemos como id_user para consistência
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id_user",
      },
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_review: {
<<<<<<< HEAD
      type: DataTypes.BIGINT,
=======
      type: DataTypes.DATE,
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "evaluations",
    timestamps: false,
  }
);

<<<<<<< HEAD
// Relacionamento: Uma avaliação pertence a um filme
EvaluationsModel.belongsTo(FilmModel, {
  foreignKey: "id_film", // Definindo a chave estrangeira correta
  as: "films", // Nome da relação
});

EvaluationsModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  as: "usues",
=======
// Relacionamento com o filme
EvaluationsModel.belongsTo(FilmModel, {
  foreignKey: "film_id", // Chave estrangeira film_id para o filme
  as: "film", // Relação com o filme
});

// Relacionamento com o usuário
EvaluationsModel.belongsTo(UserModel, {
  foreignKey: "id_user", // Chave estrangeira id_user para o usuário
  as: "user", // Relação com o usuário
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
});

export default EvaluationsModel;
