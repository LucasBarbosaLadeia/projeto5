import { DataTypes, Model } from "sequelize";
<<<<<<< HEAD
import sequelize from "../config/database"; // Importa a conexão com o banco
import FilmModel from "./FilmModel";
import ActorModel from "./ActorModel"; // Supondo que exista um modelo para atores
=======
import sequelize from "../config/database";
import FilmModel from "./FilmModel";
import ActorModel from "./ActorModel";
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7

export class ActorFilmModel extends Model {
  public id_film!: number;
  public id_actor!: number;
<<<<<<< HEAD
  public film_date!: number;
}

=======
}

// Inicialização da tabela intermediária
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
ActorFilmModel.init(
  {
    id_film: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
<<<<<<< HEAD
=======
      references: {
        model: FilmModel,
        key: "id_film",
      },
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
    },
    id_actor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
<<<<<<< HEAD
    },
    film_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
=======
      references: {
        model: ActorModel,
        key: "id_actor",
      },
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
    },
  },
  {
    sequelize,
    tableName: "atores_filmes",
<<<<<<< HEAD
    timestamps: false,
  }
);

// ✅ Correção: Relacionamento correto entre Film e Actor usando ActorFilmModel
FilmModel.belongsToMany(ActorModel, {
  through: ActorFilmModel, // Define a tabela intermediária
=======
    timestamps: false, // Se precisar registrar data de associação, remova isso e adicione createdAt e updatedAt
  }
);

// Definição do relacionamento muitos-para-muitos
FilmModel.belongsToMany(ActorModel, {
  through: ActorFilmModel,
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
  foreignKey: "id_film",
  otherKey: "id_actor",
  as: "actors",
});

ActorModel.belongsToMany(FilmModel, {
<<<<<<< HEAD
  through: ActorFilmModel, // Define a tabela intermediária
=======
  through: ActorFilmModel,
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
  foreignKey: "id_actor",
  otherKey: "id_film",
  as: "films",
});

export default ActorFilmModel;
