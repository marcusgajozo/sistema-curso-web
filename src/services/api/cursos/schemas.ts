import z from 'zod';

import { cursoTemasConstant } from '../constants/curso-temas';
import { createPaginatedResponseSchema } from '../schemas/api-schema';
import { turmaSchema } from '../turmas/schemas';

export const cursoSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  titulo: z.string(),
  descricao: z.string(),
  temas: z.array(z.enum(cursoTemasConstant)),
  urlImagem: z.url(),
  turmaIds: z.array(z.uuid()),
});

export const getCursosDisponiveis = createPaginatedResponseSchema(
  cursoSchema.and(
    z.object({
      turmas: z.array(turmaSchema),
    }),
  ),
);
