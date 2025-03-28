import { z } from "zod";

const cpfValidator = z.string().refine(
  (cpf) => {
    const isValidCPF = (cpf: string) => {
      // Remove caracteres não numéricos
      cpf = cpf.replace(/[^\d]+/g, "");
      if (cpf === "" || cpf.length !== 11) return false;

      const checkDigits = (cpf: string) => {
        const digits = cpf.split("").map(Number);

        // Calcula a soma dos dígitos multiplicados pelos pesos
        const sum = (multiplier: number) =>
          digits
            .slice(0, multiplier)
            .reduce((acc, num, i) => acc + num * (multiplier + 1 - i), 0);

        // Calcula o dígito verificador
        const mod = (sum: number) => sum % 11;

        // Calcula os dois dígitos verificadores
        const firstDigit = mod(sum(9)) < 2 ? 0 : 11 - mod(sum(9));
        const secondDigit = mod(sum(10)) < 2 ? 0 : 11 - mod(sum(10));

        return firstDigit === digits[9] && secondDigit === digits[10];
      };

      return checkDigits(cpf);
    };

    return isValidCPF(cpf);
  },
  { message: "CPF inválido" }
);

export { cpfValidator };
