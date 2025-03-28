import { z } from "zod";

export const actorSchema = z.object({
  name: z.string().min(1, "O nome do Ator é obrigatório"),
  age: z.number().min(1, "A idade do Ator é obrigatória"),
  nacionality: z.string().min(1, "A nacionalidade do Ator é obrigatória"),
});

export const updateActorSchema = actorSchema.partial();
