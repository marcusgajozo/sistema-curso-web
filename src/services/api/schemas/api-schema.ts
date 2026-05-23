import type { ZodType } from 'zod';
import { z } from 'zod';

export function createPaginatedResponseSchema<T extends ZodType>(
  itemSchema: T,
) {
  return z.object({
    data: z.array(itemSchema),
    meta: z.object({
      page: z.number(),
      limit: z.number(),
      totalCount: z.number(),
      totalPages: z.number(),
    }),
  });
}

export function createResponseSchema<T extends ZodType>(dataSchema: T) {
  return z.object({
    data: dataSchema,
  });
}
