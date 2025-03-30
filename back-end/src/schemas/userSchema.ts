import { z } from "zod";
import { isValidCPF } from "../validators/cpfValidator";

export const userSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  endereco: z.string().min(1, "O endereço é obrigatório"),
  email: z.string().email("E-mail inválido"),
  cpf: z
    .string()
    .transform((cpf) => cpf.replace(/\D/g, ""))
    .refine((cpf) => isValidCPF(cpf), { message: "CPF inválido" }),
});

export const updateUserSchema = userSchema.partial();
