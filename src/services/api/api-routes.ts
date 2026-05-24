import { ZodType } from 'zod';

import { apiRoutesCursos } from './cursos/api-routes-cursos';
import { apiRoutesTurmas } from './turmas/api-routes-turmas';
import { apiRoutesUsuarios } from './usuarios/api-routes-usuarios';

export const routes = [
  '/cursos/disponiveis',
  '/usuarios',
  '/turmas',
  '/usuarios/matricular',
  '/usuarios/:id',
  '/turmas/:id',
  '/usuarios/cencelar-matricula',
  '/cursos',
  '/cursos/:id',
] as const;

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
          errorApiSchema?: ZodType<T>;
        }
      >
    >;
  }
>;

export const apiRoutes = {
  ...apiRoutesCursos,
  ...apiRoutesUsuarios,
  ...apiRoutesTurmas,
} as const satisfies ApiRoutes;
