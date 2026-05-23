import { createBrowserRouter } from 'react-router';

import { Painel } from '../pages/painel';
import { ROUTES } from './routes-constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.PAINEL,
    Component: Painel,
  },
]);
