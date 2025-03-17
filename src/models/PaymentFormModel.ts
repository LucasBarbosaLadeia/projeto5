import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";

export class PaymentFormModel extends Model {
    id_payment_form!: number;
    name!: string;
}

PaymentFormModel.init ({
    id_payment_form: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    sequelize,
    tableName: "paymentForms",
    timestamps: false, 
}
)

export default PaymentFormModel