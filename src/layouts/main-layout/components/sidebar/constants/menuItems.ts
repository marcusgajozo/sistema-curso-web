import type { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    titulo: 'Home',
    icon: 'home',
    url: '/',
  },
  {
    titulo: 'Cursos',
    icon: 'suitcase',
    childrens: [
      {
        titulo: 'Disponíveis',
        icon: 'file-code',
        url: '/cursos',
      },
      {
        titulo: 'Meus Cursos',
        icon: 'user-fill',
        url: '/meus-cursos',
      },
    ],
  },
  {
    titulo: 'Configurações',
    icon: 'thunder',
    function: () => alert('Abrindo configurações...'),
  },
];
