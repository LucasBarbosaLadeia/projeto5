import { userSchema } from "../schemas/userSchema";

describe("Email Validation with Zod Schema", () => {
  const validData = {
    name: "Fulano",
    password: "123456",
    endereco: "Rua Exemplo",
    cpf: "541.163.700-70",
  };

  it("should pass for valid email formats", () => {
    const validEmails = [
      "test@example.com",
      "user.name@domain.co.uk",
      "123456@domain.net",
    ];

    validEmails.forEach((email) => {
      const result = userSchema.safeParse({ ...validData, email });
      expect(result.success).toBe(true);
    });
  });

  it("should fail for invalid email formats", () => {
    const invalidEmails = [
      "invalid-email",
      "@missingusername.com",
      "user@domain,com",
      "user@domain..com",
    ];

    invalidEmails.forEach((email) => {
      const result = userSchema.safeParse({ ...validData, email });
      console.log(email, result);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("E-mail inválido");
      }
    });
  });
});
