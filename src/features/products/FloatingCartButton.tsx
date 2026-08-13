import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { CartIcon } from '../../common/icons';
import { Badge } from '../../shared/ui';
import { selectCartCount } from '../cart/cartSlice';
import styles from './FloatingCartButton.module.css';

const SCROLL_THRESHOLD = 240;

export const FloatingCartButton = () => {
  const cartCount = useAppSelector(selectCartCount);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link
      to="/cart"
      className={`${styles.fab}${isVisible ? ` ${styles.fabVisible}` : ''}`}
      aria-label={`Cart, ${cartCount} items`}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <CartIcon size={24} />
      <Badge count={cartCount} variant="overlay" />
    </Link>
  );
};
