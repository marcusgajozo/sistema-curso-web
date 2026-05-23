import { ZodType } from 'zod';

import { apiRoutesCursos } from './cursos/api-routes-cursos';

export const routes = ['/cursos/disponiveis'] as const;

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type ApiRoutes<T = unknown> = Record<
  (typeof routes)[number],
  {
    methods: Partial<
      Record<
        HttpMethod,
        {
          formSchema?: ZodType<T>;
          responseSchema?: ZodType<T>;
        }
      >
    >;
  }
>;

export const apiRoutes = { ...apiRoutesCursos } as const satisfies ApiRoutes;
