import { createBrowserRouter } from 'react-router';

import { Painel } from '../pages/painel';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Painel,
  },
]);
