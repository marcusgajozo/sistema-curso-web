import { Link } from 'react-router';

import { Icon } from '../../../components/icon';
import { listIconsConstant } from '../../../components/icon/constants/list-icons.constant';
import styles from './styles/sidebar.module.css';

type MenuItem = {
  titulo: string;
  icon?: keyof typeof listIconsConstant;
  url?: string;
  function?: () => void;
  childrens?: MenuItem[];
};

const menu: MenuItem[] = [
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
              {item.icon && (
                <Icon name={item.icon} size={20} className={styles.icon} />
              )}
              <span>{item.titulo}</span>
            </Link>
          ) : item.function ? (
            <button className={styles.menuButton} onClick={item.function}>
              {item.icon && (
                <Icon name={item.icon} size={20} className={styles.icon} />
              )}
              <span>{item.titulo}</span>
            </button>
          ) : (
            <span className={styles.menuLabel}>
              {item.icon && (
                <Icon name={item.icon} size={20} className={styles.icon} />
              )}
              <span>{item.titulo}</span>
            </span>
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
