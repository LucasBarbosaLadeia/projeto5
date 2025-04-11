import request from "supertest";
import app from "../app";

describe("Validação de CPF e Nível de Senha no Cadastro", () => {
  it("Deve falhar ao tentar cadastrar com CPF inválido", async () => {
    const res = await request(app).post("/users").send({
      name: "Teste CPF",
      email: "teste@cpf.com",
      password: "Senha123!",
      endereco: "Rua A",
      cpf: "123.456.789-00",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");

    const cpfError = res.body.errors.find((err: any) =>
      err.path.includes("cpf")
    );
    expect(cpfError).toBeDefined();
    expect(cpfError.message).toMatch(/cpf inválido/i);
  });

  it("Deve falhar ao tentar cadastrar com senha fraca", async () => {
    const res = await request(app).post("/users").send({
      name: "Senha Fraca",
      email: "senha@fraca.com",
      password: "123",
      endereco: "Rua B",
      cpf: "541.163.700-70",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");

    const senhaError = res.body.errors.find((err: any) =>
      err.path.includes("password")
    );
    expect(senhaError).toBeDefined();
    expect(senhaError.message).toMatch(/pelo menos 6 caracteres/i);
  });
});
