import type { ReactNode } from 'react';

import {
  CartIcon,
  HeartIcon,
  LogoIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from '../../assets/icons';
import styles from './IconsPage.module.css';

type IconPreview = {
  name: string;
  node: ReactNode;
  wide?: boolean;
};

const icons: IconPreview[] = [
  { name: 'LogoIcon', node: <LogoIcon size={108} />, wide: true },
  { name: 'CartIcon', node: <CartIcon size={32} /> },
  { name: 'MenuIcon', node: <MenuIcon size={32} /> },
  { name: 'UserIcon', node: <UserIcon size={32} /> },
  { name: 'SearchIcon', node: <SearchIcon size={32} /> },
  { name: 'HeartIcon', node: <HeartIcon size={32} /> },
];

export const IconsPage = () => (
  <section className={styles.page}>
    <h1 className={styles.title}>Icons ({icons.length})</h1>
    <ul className={styles.grid}>
      {icons.map(({ name, node, wide }) => (
        <li key={name} className={`${styles.item}${wide ? ` ${styles.wide}` : ''}`}>
          <div className={styles.preview}>{node}</div>
          <span className={styles.name}>{name}</span>
        </li>
      ))}
    </ul>
  </section>
);
