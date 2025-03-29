<<<<<<< HEAD
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class SubscriptionModel extends Model {
    id_subscription!: number;
    name!: string;
    price!: number;
    duration!: string;
}

SubscriptionModel.init ({
    id_subscription: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize, // Conexão com o banco de dados
    tableName: "subscriptions", // Nome da tabela no BD
    timestamps: false, // Se não houver created_at e updated_at
  }

);

=======
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class SubscriptionModel extends Model {
    id_subscription!: number;
    name!: string;
    price!: number;
    duration!: string;
}

SubscriptionModel.init ({
    id_subscription: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize, // Conexão com o banco de dados
    tableName: "subscriptions", // Nome da tabela no BD
    timestamps: false, // Se não houver created_at e updated_at
  }

);

>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
export default SubscriptionModel;