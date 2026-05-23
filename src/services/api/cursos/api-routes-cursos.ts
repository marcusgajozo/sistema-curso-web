import type { ApiRoutes } from '../api-routes';
import { getCursosDisponiveis } from './schemas';

export const apiRoutesCursos = {
  '/cursos/disponiveis': {
    methods: {
      get: {
        responseSchema: getCursosDisponiveis,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
