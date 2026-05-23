import { Link } from 'react-router';

import { Icon } from '@/components/icon';

import { menuItems } from './constants/menuItems';
import styles from './styles/sidebar.module.css';
import type { MenuItem } from './types/menu';

interface MenuListProps {
  items: MenuItem[];
}

function MenuList({ items }: MenuListProps) {
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
      <MenuList items={menuItems} />
    </nav>
  );
}
