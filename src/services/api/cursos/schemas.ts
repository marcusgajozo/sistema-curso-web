import z from 'zod';

import { cursoTemasConstant } from '../constants/curso-temas';
import {
  createPaginatedResponseSchema,
  createResponseSchema,
} from '../schemas/api-schema';
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

export const createCurso = z.object({
  titulo: z.string(),
  descricao: z.string(),
  temas: z.array(z.enum(cursoTemasConstant)),
  urlImagem: z.url(),
});

export const updateCurso = createCurso.partial();

export const getCursosShema = createPaginatedResponseSchema(cursoSchema);
export const getCursoSchema = createResponseSchema(
  cursoSchema.and(
    z.object({
      turmas: z.array(turmaSchema),
    }),
  ),
);
