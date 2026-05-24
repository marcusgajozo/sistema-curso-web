import z from 'zod';

import { createPaginatedResponseSchema } from '../schemas/api-schema';

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

export const matricularUsuario = z.object({
  usuarioId: z.uuid(),
  turmasIds: z.array(z.uuid()),
});
