import z from 'zod';

export const createUsuarioSchema = z.object({
  email: z.email(),
  nome: z.string(),
  turmasIds: z.array(z.uuid()).optional(),
});
