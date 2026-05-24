import type { ZodType } from 'zod';
import { z } from 'zod';

export const errorApiSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
  timestamp: z.iso.datetime(),
  path: z.string(),
});

export const metaSchema = z.object({
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
  }),
});

export function createPaginatedResponseSchema<T extends ZodType>(
  itemSchema: T,
) {
  return z
    .object({
      data: z.array(itemSchema),
    })
    .and(metaSchema);
}

export function createResponseSchema<T extends ZodType>(dataSchema: T) {
  return z.object({
    data: dataSchema,
  });
}
