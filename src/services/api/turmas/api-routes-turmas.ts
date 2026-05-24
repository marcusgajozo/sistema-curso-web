import type { ApiRoutes } from '../api-routes';
import { getTurmasSchema } from './schemas';

export const apiRoutesTurmas = {
  '/turmas': {
    methods: {
      get: {
        responseSchema: getTurmasSchema,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
