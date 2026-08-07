import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { selectCartCount } from '../../features/cart/cartSlice';
import { selectWishlistCount } from '../../features/wishlist/wishlistSlice';
import { Icon } from '../icons';
import styles from './Header.module.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logo} aria-label="2ND HAND MARKET">
          <Icon name="logo" size={216} />
        </Link>

        <label className={styles.search}>
          <Icon name="search" size={20} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </label>

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            <li>
              <Link to="/about" className={styles.navLink}>
                About us
              </Link>
            </li>
            <li>
              <Link to="/shops" className={styles.navLink}>
                All shops
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.navLink}>
                Become a merchant
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to="/wishlist" className={styles.action} aria-label="Wishlist">
            <Icon name="heart" size={22} />
            <span className={styles.badge}>{wishlistCount}</span>
          </Link>
          <Link to="/cart" className={styles.action} aria-label="Cart">
            <Icon name="cart" size={22} />
            <span className={styles.badge}>{cartCount}</span>
          </Link>
          <button
            type="button"
            className={styles.action}
            aria-label="Log out"
            onClick={handleLogout}
          >
            <Icon name="user" size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};
