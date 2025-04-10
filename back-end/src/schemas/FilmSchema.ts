import { z } from "zod";

export const filmSchema = z.object({
  name: z.string().min(1, "O título do Filme é obrigatório"),
  description: z.string().min(1, "A descricao do Filme é obrigatória"),
  images: z.string().min(1, "A imagem do Filme é obrigatória"),
  launch_date: z.string().min(1, "A data de lançamento do Filme é obrigatória"),
  actorIds: z.array(z.number()).min(1, "Informe pelo menos um ator."),
});
