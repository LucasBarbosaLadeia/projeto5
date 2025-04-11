import request from "supertest";
import bcrypt from "bcryptjs";
import app from "../app";
import { UserModel } from "../models/UserModel";
import { generateToken } from "../utils/jwt";

describe("PUT /users/:id - Atualização de usuário", () => {
  let userA: any;
  let userB: any;
  let tokenA: string;
  let tokenB: string;

  beforeAll(async () => {
    await UserModel.destroy({ where: {} });

    userA = await UserModel.create({
      name: "User A",
      email: "usera@example.com",
      password: await bcrypt.hash("123456", 10),
      endereco: "Rua Teste 1",
      cpf: "52998224725",
      admin: false,
    });

    userB = await UserModel.create({
      name: "User B",
      email: "userb@example.com",
      password: await bcrypt.hash("654321", 10),
      endereco: "Rua Teste 2",
      cpf: "39053344705",
      admin: false,
    });

    tokenA = generateToken(userA);
    tokenB = generateToken(userB);
  });

  it("Deve permitir que o usuário edite seu próprio nome", async () => {
    const res = await request(app)
      .put(`/users/${userA.id_user}`)
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ name: "User A Atualizado" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Usuário atualizado com sucesso"
    );
    expect(res.body.user.name).toBe("User A Atualizado");
  });

  it("Não deve permitir alteração do e-mail", async () => {
    const res = await request(app)
      .put(`/users/${userA.id_user}`)
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ email: "novoemail@example.com" });

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty(
      "error",
      "Você não pode alterar seu e-mail"
    );
  });

  it("Não deve permitir que um usuário edite outro", async () => {
    const res = await request(app)
      .put(`/users/${userB.id_user}`)
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ name: "Hacker" });

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty(
      "error",
      "Você só pode editar seus próprios dados"
    );
  });

  it("Deve retornar 401 se token for inválido", async () => {
    const res = await request(app)
      .put(`/users/${userA.id_user}`)
      .set("Authorization", "Bearer tokenInvalido")
      .send({ name: "Tentativa inválida" });

    expect(res.status).toBe(401);
  });

  it("Deve retornar 401 se token não for enviado", async () => {
    const res = await request(app)
      .put(`/users/${userA.id_user}`)
      .send({ name: "Sem token" });

    expect(res.status).toBe(401);
  });

  afterAll(async () => {
    await UserModel.destroy({ where: {} });
  });
});
