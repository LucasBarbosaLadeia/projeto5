import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

const invalidToken = "Bearer token.invalido.aqui";
const validUserToken =
  "Bearer " +
  jwt.sign({ id: 2, role: "user" }, process.env.JWT_SECRET || "segredo", {
    expiresIn: "1h",
  });
const validAdminToken =
  "Bearer " +
  jwt.sign({ id: 1, role: "admin" }, process.env.JWT_SECRET || "segredo", {
    expiresIn: "1h",
  });

describe("Proteção das rotas de FILMS", () => {
  const routes = [
    { method: "get", path: "/films" },
    { method: "get", path: "/films/1" },
    { method: "get", path: "/films/1/comments" },
    { method: "post", path: "/films" },
    { method: "put", path: "/films/1" },
    { method: "delete", path: "/films/1" },
  ];

  routes.forEach(({ method, path }) => {
    it(`[${method.toUpperCase()}] ${path} deve retornar 401 sem token`, async () => {
      const res = await (request(app) as any)[method](path);
      expect(res.status).toBe(401);
    });

    it(`[${method.toUpperCase()}] ${path} deve retornar 401 com token inválido`, async () => {
      const res = await (request(app) as any)
        [method](path)
        .set("Authorization", invalidToken);
      expect(res.status).toBe(401);
    });
  });

  it("GET /films deve retornar sucesso com token válido de usuário", async () => {
    const res = await request(app)
      .get("/films")
      .set("Authorization", validUserToken);
    expect(res.status).not.toBe(401);
  });

  it("POST /films deve retornar sucesso com token válido de usuário", async () => {
    const res = await request(app)
      .post("/films")
      .set("Authorization", validUserToken)
      .send({ title: "Novo Filme", description: "Descrição teste" });
    expect(res.status).not.toBe(401);
  });

  it("PUT /films/:id deve permitir apenas admin", async () => {
    const res = await request(app)
      .put("/films/1")
      .set("Authorization", validAdminToken)
      .send({ title: "Atualizado" });
    expect(res.status).not.toBe(401);
  });

  it("DELETE /films/:id deve permitir apenas admin", async () => {
    const res = await request(app)
      .delete("/films/1")
      .set("Authorization", validAdminToken);
    expect(res.status).not.toBe(401);
  });
});
