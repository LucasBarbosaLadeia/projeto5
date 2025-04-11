import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

const invalidToken = "Bearer token.invalido.aqui";
const validUserToken =
  "Bearer " +
  jwt.sign({ id: 3, role: "user" }, process.env.JWT_SECRET || "segredo", {
    expiresIn: "1h",
  });

describe("Proteção das rotas de USERS", () => {
  const protectedRoutes = [
    { method: "get", path: "/users" },
    { method: "get", path: "/users/1" },
    { method: "put", path: "/users/1" },
    { method: "delete", path: "/users/1" },
  ];

  protectedRoutes.forEach(({ method, path }) => {
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

  it("GET /users deve funcionar com token válido", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", validUserToken);
    expect(res.status).not.toBe(401);
  });

  it("PUT /users/:id deve funcionar com token válido", async () => {
    const res = await request(app)
      .put("/users/1")
      .set("Authorization", validUserToken)
      .send({ name: "Atualizado" });
    expect(res.status).not.toBe(401);
  });

  it("DELETE /users/:id deve funcionar com token válido", async () => {
    const res = await request(app)
      .delete("/users/1")
      .set("Authorization", validUserToken);
    expect(res.status).not.toBe(401);
  });

  it("POST /users deve ser acessível sem autenticação", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Novo", email: "teste@exemplo.com", password: "123456" });
    expect(res.status).not.toBe(401);
  });
});
