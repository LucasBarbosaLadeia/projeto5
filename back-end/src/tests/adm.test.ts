import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

// Simula um JWT secret igual ao usado na função real
const JWT_SECRET = "Segredo_kkk"; // substitua conforme seu .env

describe("Testando rota /dashboard protegida por authMiddleware e admin", () => {
  it("deve retornar 401 se nenhum token for fornecido", async () => {
    const res = await request(app).get("/dashboard");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Token não fornecido");
  });

  it("deve retornar 401 se o token for inválido", async () => {
    const res = await request(app)
      .get("/dashboard")
      .set("Authorization", "Bearer token_invalido");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("msg", "Token inválido");
  });

  it("deve retornar 403 se o usuário não for admin", async () => {
    const token = jwt.sign({ id: 1, admin: false }, JWT_SECRET);
    const res = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error", "Acesso negado");
  });

  it("deve retornar 200 se o usuário for admin", async () => {
    const token = jwt.sign({ id: 1, admin: true }, JWT_SECRET);
    const res = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("msg", "Você é um ADM!");
  });
});
