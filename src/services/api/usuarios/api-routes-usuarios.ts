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
        errorApiSchema,
      },
      get: {
        responseSchema: getUsuariosShema,
        errorApiSchema,
      },
    },
  },
  '/usuarios/:id': {
    methods: {
      get: {
        responseSchema: getUsuarioIdShema,
        errorApiSchema,
      },
      patch: {
        formSchema: updateUsuario,
        errorApiSchema,
      },
      delete: {
        errorApiSchema,
      },
    },
  },
  '/usuarios/matricular': {
    methods: {
      post: {
        formSchema: matricularUsuario,
        errorApiSchema,
      },
    },
  },
  '/usuarios/cancelar-matricula': {
    methods: {
      post: {
        formSchema: cancelarMatricula,
        errorApiSchema,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
