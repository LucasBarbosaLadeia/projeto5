import request from "supertest";
import app from "../app";
import jwt from "jsonwebtoken";

const invalidToken = "Bearer invalid.token.aqui";

const validUserToken =
  "Bearer " +
  jwt.sign({ id: 1, role: "user" }, process.env.JWT_SECRET || "segredo", {
    expiresIn: "1h",
  });
const validAdminToken =
  "Bearer " +
  jwt.sign({ id: 1, role: "admin" }, process.env.JWT_SECRET || "segredo", {
    expiresIn: "1h",
  });

describe("Proteção das rotas de ACTORS", () => {
  const routesToTest = [
    { method: "get", path: "/actors" },
    { method: "get", path: "/actors/1" },
    { method: "post", path: "/actors" },
    { method: "post", path: "/actors/addActorToFilm" },
    { method: "put", path: "/actors/1" },
    { method: "delete", path: "/actors/1" },
  ];

  routesToTest.forEach(({ method, path }) => {
    it(`deve retornar 401 se o token estiver ausente para [${method.toUpperCase()}] ${path}`, async () => {
      const res = await (request(app) as any)[method](path);
      expect(res.status).toBe(401);
    });

    it(`deve retornar 401 se o token for inválido para [${method.toUpperCase()}] ${path}`, async () => {
      const res = await (request(app) as any)
        [method](path)
        .set("Authorization", invalidToken);
      expect(res.status).toBe(401);
    });
  });

  it("deve permitir GET /actors com token válido de usuário", async () => {
    const res = await request(app)
      .get("/actors")
      .set("Authorization", validUserToken);
    expect(res.status).not.toBe(401);
  });

  it("deve permitir POST /actors com token válido de admin", async () => {
    const res = await request(app)
      .post("/actors")
      .set("Authorization", validAdminToken)
      .send({ name: "Novo Ator" });
    expect(res.status).not.toBe(401);
  });
});
