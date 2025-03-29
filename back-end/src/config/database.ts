import { Sequelize } from "sequelize";
<<<<<<< HEAD
const IsTest = process.env.NODE_ENV === 'test'
const sequelize = new Sequelize(
  IsTest ? "cinebook_test" : "cinebook", "root", "", {
=======

const sequelize = new Sequelize("cinebook", "root", "", {
>>>>>>> aaed07f096c937496bde8a96e800eef39a4337c7
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
