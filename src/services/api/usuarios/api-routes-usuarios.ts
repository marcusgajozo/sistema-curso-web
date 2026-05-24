import type { ApiRoutes } from '../api-routes';
import {
  createUsuarioSchema,
  getUsuariosShema,
  matricularUsuario,
} from './schemas';

export const apiRoutesUsuarios = {
  '/usuarios': {
    methods: {
      post: {
        formSchema: createUsuarioSchema,
      },
      get: {
        responseSchema: getUsuariosShema,
      },
    },
  },
  '/usuarios/matricular': {
    methods: {
      post: {
        formSchema: matricularUsuario,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
