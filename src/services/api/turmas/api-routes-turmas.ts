import type { ApiRoutes } from '../api-routes';
import { getTurmaSchema, getTurmasSchema } from './schemas';

export const apiRoutesTurmas = {
  '/turmas': {
    methods: {
      get: {
        responseSchema: getTurmasSchema,
      },
    },
  },
  '/turmas/:id': {
    methods: {
      get: {
        responseSchema: getTurmaSchema,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
