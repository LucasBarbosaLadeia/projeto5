import request from "supertest";
import app from "../app"; // ajuste o caminho se necessário
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel";
import sequelize from "../config/database";

jest.setTimeout(20000); // aumenta o timeout para testes mais pesados

describe("Login API", () => {
  beforeAll(async () => {
    // Conecta ao banco e garante sincronização
    await sequelize.sync({ force: true });

    // Cria usuário com senha hasheada
    const hashedPassword = await bcrypt.hash("GabrielSpeciam2", 10);

    await UserModel.create({
      name: "Gabriel Sanches",
      email: "GabrielSanches2@gmail.com",
      password: "GabrielSpeciam2",
      cpf: "12345678900",
      endereco: "Rua dos Testes",
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
    expect(response.body).toHaveProperty("error", "Senha ou e-mail inválida");
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
    await sequelize.close(); // Fecha conexão com o banco após os testes
  });
});
