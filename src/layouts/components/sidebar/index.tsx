import { Link } from 'react-router';

import styles from './styles.module.css';

type MenuItem = {
  titulo: string;
  url?: string;
  function?: () => void;
  childrens?: MenuItem[];
};

const menu: MenuItem[] = [
  {
    titulo: 'Home',
    url: '/',
  },
  {
    titulo: 'Cursos',
    childrens: [
      {
        titulo: 'Disponíveis',
        url: '/cursos',
      },
      {
        titulo: 'Meus Cursos',
        url: '/meus-cursos',
      },
    ],
  },
  {
    titulo: 'Configurações',
    function: () => alert('Abrindo configurações...'),
  },
];

function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <ul className={styles.menuList}>
      {items.map((item, index) => (
        <li key={index} className={styles.menuItem}>
          {item.url ? (
            <Link
              to={item.url}
              className={styles.menuLink}
              onClick={item.function}
            >
              {item.titulo}
            </Link>
          ) : item.function ? (
            <button className={styles.menuButton} onClick={item.function}>
              {item.titulo}
            </button>
          ) : (
            <span className={styles.menuLabel}>{item.titulo}</span>
          )}

          {item.childrens && item.childrens.length > 0 && (
            <MenuList items={item.childrens} />
          )}
        </li>
      ))}
    </ul>
  );
}

export function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <MenuList items={menu} />
    </nav>
  );
}
