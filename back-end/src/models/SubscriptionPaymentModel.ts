import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import SubscriptionModel from "./SubscriptionModel";
import PaymentFormModel from "./PaymentFormModel";

export class SubscriptionPaymentModel extends Model {
  public id_payment_form!: number;
  public id_Subscription!: number;
}

SubscriptionPaymentModel.init(
  {
    id_subscription: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_payment_form: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "subscriptionPayment",
    timestamps: false,
  }
);
SubscriptionModel.belongsToMany(PaymentFormModel, {
  through: SubscriptionPaymentModel, // Define a tabela intermediária
  foreignKey: "id_subscription",
  otherKey: "id_payment_form",
  as: "paymentForms",
});

PaymentFormModel.belongsToMany(SubscriptionModel, {
  through: SubscriptionPaymentModel, // Define a tabela intermediária
  foreignKey: "id_payment_form",
  otherKey: "id_subscription",
  as: "subscritions",
});
