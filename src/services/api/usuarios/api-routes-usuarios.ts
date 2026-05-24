import type { ApiRoutes } from '../api-routes';
import { createUsuarioSchema } from './schemas';

export const apiRoutesUsuarios = {
  '/usuarios': {
    methods: {
      post: {
        formSchema: createUsuarioSchema,
      },
    },
  },
} as const satisfies Partial<ApiRoutes>;
