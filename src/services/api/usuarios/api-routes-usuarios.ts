import type { ApiRoutes } from '../api-routes';
import { errorApiSchema } from '../schemas/api-schema';
import {
  cancelarMatricula,
  createUsuarioSchema,
  getUsuarioIdShema,
  getUsuariosShema,
  matricularUsuario,
  updateUsuario,
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
      patch: {
        formSchema: updateUsuario,
      },
      delete: {
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
  '/usuarios/cencelar-matricula': {
    methods: {
      post: {
        formSchema: cancelarMatricula,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
