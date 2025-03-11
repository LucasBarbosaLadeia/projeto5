
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("CineBook", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
