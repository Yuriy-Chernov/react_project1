import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectCartCount } from '../../features/cart/cartSlice';
import { selectWishlistCount } from '../../features/wishlist/wishlistSlice';
import {
  CartIcon,
  HeartIcon,
  LogoIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from '../icons';
import styles from './Header.module.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logo} aria-label="2ND HAND MARKET">
          <LogoIcon size={216} />
        </Link>

        <label className={styles.search}>
          <SearchIcon size={20} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </label>

        <button
          type="button"
          className={styles.burger}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MenuIcon size={28} />
        </button>

        <div
          id="header-menu"
          className={`${styles.menuPanel}${isMenuOpen ? ` ${styles.menuPanelOpen}` : ''}`}
        >
          <nav className={styles.nav} aria-label="Main">
            <ul className={styles.navList}>
              <li>
                <Link to="/about" className={styles.navLink} onClick={closeMenu}>
                  About us
                </Link>
              </li>
              <li>
                <Link to="/shops" className={styles.navLink} onClick={closeMenu}>
                  All shops
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  Become a merchant
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link
              to="/wishlist"
              className={styles.action}
              aria-label="Wishlist"
              onClick={closeMenu}
            >
              <HeartIcon size={22} />
              <span className={styles.badge}>{wishlistCount}</span>
            </Link>
            <Link
              to="/cart"
              className={styles.action}
              aria-label="Cart"
              onClick={closeMenu}
            >
              <CartIcon size={22} />
              <span className={styles.badge}>{cartCount}</span>
            </Link>
            <button
              type="button"
              className={styles.action}
              aria-label="Log out"
              onClick={handleLogout}
            >
              <UserIcon size={22} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
