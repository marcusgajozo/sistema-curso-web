import { createBrowserRouter } from 'react-router';

import { MainLayout } from '../layouts/main-layout';
import { Painel } from '../pages/painel';
import { ROUTES } from './routes-constants';

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: ROUTES.PAINEL,
        Component: Painel,
      },
    ],
  },
]);
