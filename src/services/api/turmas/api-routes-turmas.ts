import type { ApiRoutes } from '../api-routes';
import { errorApiSchema } from '../schemas/api-schema';
import {
  createTurma,
  getTurmaSchema,
  getTurmasSchema,
  updateTurma,
} from './schemas';

export const apiRoutesTurmas = {
  '/turmas': {
    methods: {
      get: {
        responseSchema: getTurmasSchema,
        errorApiSchema: errorApiSchema,
      },
      post: {
        formSchema: createTurma,
        errorApiSchema: errorApiSchema,
      },
    },
  },
  '/turmas/:id': {
    methods: {
      get: {
        responseSchema: getTurmaSchema,
        errorApiSchema: errorApiSchema,
      },
      patch: {
        formSchema: updateTurma,
        errorApiSchema: errorApiSchema,
      },
      delete: { errorApiSchema: errorApiSchema },
    },
  },
} as const satisfies Partial<ApiRoutes>;
