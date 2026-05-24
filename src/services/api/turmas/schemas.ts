import z from 'zod';

import { turmaStatusConstant } from '../constants/turma-status';
import {
  createPaginatedResponseSchema,
  createResponseSchema,
} from '../schemas/api-schema';

export const turmaSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  titulo: z.string(),
  descricao: z.string(),
  quantidadeVagas: z.number(),
  status: z.enum(turmaStatusConstant),
  dataInicio: z.iso.datetime(),
  dataFim: z.iso.datetime(),
  cursoId: z.uuid(),
  usuariosIds: z.array(z.uuid()),
});

export const getTurmasSchema = createPaginatedResponseSchema(turmaSchema);
export const getTurmaSchema = createResponseSchema(turmaSchema);
