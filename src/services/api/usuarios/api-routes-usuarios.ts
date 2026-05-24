import type { ApiRoutes } from '../api-routes';
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
      },
      get: {
        responseSchema: getUsuariosShema,
      },
    },
  },
  '/usuarios/:id': {
    methods: {
      get: {
        responseSchema: getUsuarioIdShema,
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
