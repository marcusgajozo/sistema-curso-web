import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@/layouts/main-layout';
import { GlobalError } from '@/pages/global-error';
import { NotFound } from '@/pages/not-found';
import { Painel } from '@/pages/painel';

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
            path: 'teste',
            Component: GlobalError,
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
