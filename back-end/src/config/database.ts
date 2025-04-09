import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTest ? "cinebookTest" : "cinebook",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
