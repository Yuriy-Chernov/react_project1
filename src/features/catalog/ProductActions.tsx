import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button } from '../../shared/ui';
import { addToCart, selectIsInCart } from '../cart/cartSlice';
import type { CatalogItem } from '../catalog/types';
import { selectIsInWishlist, toggleWishlist } from '../wishlist/wishlistSlice';
import styles from './ProductActions.module.css';

type ProductActionsProps = {
  product: CatalogItem;
  variant?: 'card' | 'page';
};

export const ProductActions = ({
  product,
  variant = 'card',
}: ProductActionsProps) => {
  const dispatch = useAppDispatch();
  const inCart = useAppSelector(selectIsInCart(product.id));
  const inWishlist = useAppSelector(selectIsInWishlist(product.id));

  return (
    <div
      className={variant === 'page' ? styles.pageActions : styles.cardActions}
    >
      <Button
        variant="secondary"
        className={styles.action}
        aria-pressed={inWishlist}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={() => dispatch(toggleWishlist(product))}
      >
        {inWishlist ? 'In Wishlist' : 'Wishlist'}
      </Button>
      <Button
        className={styles.action}
        onClick={() => dispatch(addToCart(product))}
      >
        {inCart ? 'Add again' : 'Add to cart'}
      </Button>
    </div>
  );
};
