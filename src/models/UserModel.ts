import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Importa a conexão com o banco
import bcrypt from "bcryptjs";

export class UserModel extends Model {
  public id_user!: number;
  public name!: string;
  public password!: string;
  public email!: string;
  public endereco!: string;
  public cpf!: string;
  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password!);
  }
}

UserModel.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255), // Armazena senhas criptografadas
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING(200),
      allowNull: true, // Pode ser nulo
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
  },
  {
    sequelize, // Conexão com o banco de dados
    tableName: "users", // Nome da tabela no BD
    timestamps: false, // Se não houver `created_at` e `updated_at`
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

export default UserModel;
