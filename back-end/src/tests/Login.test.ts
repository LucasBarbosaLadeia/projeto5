import request from "supertest";
import app from "../app";
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel";
import sequelize from "../config/database";

jest.setTimeout(20000);

describe("Login API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash("GabrielSpeciam2", 10);

    await UserModel.create({
      name: "Gabriel Sanches",
      email: "GabrielSanches2@gmail.com",
      password: "GabrielSpeciam2",
      cpf: "12345678900",
      admin: false,
    });
  });

  it("deve logar com sucesso com e-mail e senha válidos", async () => {
    const response = await request(app).post("/login").send({
      email: "GabrielSanches2@gmail.com",
      password: "GabrielSpeciam2",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty(
      "message",
      "Usuário logado com sucesso"
    );
  });

  it("deve falhar ao tentar logar com e-mail inválido", async () => {
    const response = await request(app).post("/login").send({
      email: "naoexiste@email.com",
      password: "qualquersenha",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Usuário não encontrado");
  });

  it("deve falhar ao tentar logar com senha incorreta", async () => {
    const response = await request(app).post("/login").send({
      email: "GabrielSanches2@gmail.com",
      password: "senhaerrada123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Credenciais inválidas");
  });

  it("deve falhar ao tentar logar sem e-mail ou senha", async () => {
    const response = await request(app).post("/login").send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Informe e-mail e senha");
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
