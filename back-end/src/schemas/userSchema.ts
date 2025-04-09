// src/schemas/userSchema.ts
import { z } from "zod";
import { isValidCPF } from "../validators/cpfValidator";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

export const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  endereco: z.string().min(1, "O endereço é obrigatório"),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .regex(emailRegex, { message: "E-mail inválido" }),
  cpf: z
    .string()
    .transform((cpf) => cpf.replace(/\D/g, ""))
    .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
});
