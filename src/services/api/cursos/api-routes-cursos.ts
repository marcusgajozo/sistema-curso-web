import type { ApiRoutes } from '../api-routes';
import { errorApiSchema } from '../schemas/api-schema';
import {
  createCurso,
  getCursoSchema,
  getCursosDisponiveis,
  getCursosShema,
  updateCurso,
} from './schemas';

export const apiRoutesCursos = {
  '/cursos/disponiveis': {
    methods: {
      get: {
        responseSchema: getCursosDisponiveis,
        errorApiSchema,
      },
    },
  },
  '/cursos': {
    methods: {
      get: {
        responseSchema: getCursosShema,
        errorApiSchema,
      },
      post: {
        formSchema: createCurso,
        errorApiSchema,
      },
    },
  },
  '/cursos/:id': {
    methods: {
      get: {
        responseSchema: getCursoSchema,
        errorApiSchema,
      },
      patch: {
        formSchema: updateCurso,
        errorApiSchema,
      },

      delete: {
        errorApiSchema,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
