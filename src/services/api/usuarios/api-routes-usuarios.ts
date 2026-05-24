import type { ApiRoutes } from '../api-routes';
import { errorApiSchema } from '../schemas/api-schema';
import {
  createUsuarioSchema,
  getUsuarioIdShema,
  getUsuariosShema,
  matricularUsuario,
} from './schemas';

export const apiRoutesUsuarios = {
  '/usuarios': {
    methods: {
      post: {
        formSchema: createUsuarioSchema,
        errorApiSchema: errorApiSchema,
      },
      get: {
        responseSchema: getUsuariosShema,
        errorApiSchema: errorApiSchema,
      },
    },
  },
  '/usuarios/:id': {
    methods: {
      get: {
        responseSchema: getUsuarioIdShema,
        errorApiSchema: errorApiSchema,
      },
    },
  },
  '/usuarios/matricular': {
    methods: {
      post: {
        formSchema: matricularUsuario,
        errorApiSchema: errorApiSchema,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
