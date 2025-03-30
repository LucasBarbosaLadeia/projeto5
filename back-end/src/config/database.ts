import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cinebook", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
