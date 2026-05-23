import z from 'zod';

import { cursoTemasConstant } from '../constants/curso-temas';
import { turmaStatusConstant } from '../constants/turma-status';
import { createPaginatedResponseSchema } from '../schemas/api-schema';

export const getCursosDisponiveis = createPaginatedResponseSchema(
  z.object({
    id: z.uuid(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    titulo: z.string(),
    descricao: z.string(),
    temas: z.array(z.enum(cursoTemasConstant)),
    urlImagem: z.url(),
    turmas: z.array(
      z.object({
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
      }),
    ),
    turmaIds: z.array(z.uuid()),
  }),
);
