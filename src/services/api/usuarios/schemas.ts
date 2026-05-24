import z from 'zod';

import { cursoSchema } from '../cursos/schemas';
import {
  createPaginatedResponseSchema,
  createResponseSchema,
} from '../schemas/api-schema';
import { turmaSchema } from '../turmas/schemas';

export const usuarioSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  email: z.email(),
  nome: z.string(),
  turmasIds: z.array(z.uuid()),
});

export const createUsuarioSchema = z.object({
  email: z.email(),
  nome: z.string(),
  turmasIds: z.array(z.uuid()).optional(),
});

export const getUsuariosShema = createPaginatedResponseSchema(usuarioSchema);
export const getUsuarioIdShema = createResponseSchema(
  usuarioSchema.and(
    z.object({
      turmas: z.array(turmaSchema.and(z.object({ curso: cursoSchema }))),
    }),
  ),
);

export const matricularUsuario = z.object({
  usuarioId: z.uuid(),
  turmasIds: z.array(z.uuid()),
});

export const cancelarMatricula = matricularUsuario;
export const updateUsuario = createUsuarioSchema
  .omit({ turmasIds: true })
  .partial();
