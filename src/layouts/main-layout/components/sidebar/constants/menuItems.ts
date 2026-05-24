import { ROUTES } from '@/routes/constants/routes-constants';

import type { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    titulo: 'Painel',
    icon: 'home',
    url: ROUTES.PAINEL,
  },
  {
    titulo: 'Curso',
    icon: 'suitcase',
    childrens: [
      {
        titulo: 'Cursos',
        icon: 'file-code',
        url: ROUTES.CURSOS_DISPONIVEIS,
      },
      {
        titulo: 'Cursos disponíveis',
        icon: 'file-code',
        url: ROUTES.CURSOS_DISPONIVEIS,
      },
    ],
  },
  {
    titulo: 'Turma',
    icon: 'suitcase',
    childrens: [
      {
        titulo: 'Turmas',
        icon: 'file-code',
        url: ROUTES.CURSOS_DISPONIVEIS,
      },
    ],
  },
  {
    titulo: 'Usuário',
    icon: 'suitcase',
    childrens: [
      {
        titulo: 'Usuários',
        icon: 'file-code',
        url: ROUTES.CURSOS_DISPONIVEIS,
      },
    ],
  },
];
