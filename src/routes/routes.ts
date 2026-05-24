import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@/layouts/main-layout';
import { CreateCurso } from '@/pages/create-curso';
import { CreateUsuario } from '@/pages/create-usuario';
import { Cursos } from '@/pages/cursos';
import { CursosDisponiveis } from '@/pages/cursos-disponiveis';
import { Dashboard } from '@/pages/dashboard';
import { GerenciarTurma } from '@/pages/gerenciar-turma';
import { GlobalError } from '@/pages/global-error';
import { NotFound } from '@/pages/not-found';
import { Turmas } from '@/pages/turmas';
import { UsuarioId } from '@/pages/usuario-id';
import { Usuarios } from '@/pages/usuarios';

import { ROUTES } from './constants/routes-constants';

export const router = createBrowserRouter([
  {
    ErrorBoundary: GlobalError,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: ROUTES.DASHBOARD,
            Component: Dashboard,
          },
          {
            path: ROUTES.CURSOS_DISPONIVEIS,
            Component: CursosDisponiveis,
          },
          {
            path: ROUTES.CREATE_USUARIO,
            Component: CreateUsuario,
          },
          {
            path: ROUTES.CREATE_CURSO,
            Component: CreateCurso,
          },
          {
            path: ROUTES.TURMAS,
            Component: Turmas,
          },
          {
            path: ROUTES.USUARIOS,
            Component: Usuarios,
          },
          {
            path: ROUTES.USUARIO_ID,
            Component: UsuarioId,
          },
          {
            path: ROUTES.GERENCIAR_TURMA,
            Component: GerenciarTurma,
          },
          {
            path: ROUTES.CURSOS,
            Component: Cursos,
          },
        ],
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
