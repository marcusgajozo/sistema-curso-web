import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@/layouts/main-layout';
import { CreateUsuario } from '@/pages/create-usuario';
import { CursosDisponiveis } from '@/pages/cursos-disponiveis';
import { GlobalError } from '@/pages/global-error';
import { NotFound } from '@/pages/not-found';
import { Painel } from '@/pages/painel';
import { Turmas } from '@/pages/turmas';

import { ROUTES } from './constants/routes-constants';

export const router = createBrowserRouter([
  {
    ErrorBoundary: GlobalError,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: ROUTES.PAINEL,
            Component: Painel,
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
            path: ROUTES.TURMAS,
            Component: Turmas,
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
