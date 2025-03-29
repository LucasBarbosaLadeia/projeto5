import { Sequelize } from "sequelize";
const IsTest = process.env.NODE_ENV === 'test'
const sequelize = new Sequelize(
  IsTest ? "cinebook_test" : "cinebook", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
