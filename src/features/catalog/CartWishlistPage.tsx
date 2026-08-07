import { Link, NavLink, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
} from '../cart/cartSlice';
import {
  removeFromWishlist,
  selectWishlistItems,
} from '../wishlist/wishlistSlice';
import styles from './CartWishlistPage.module.css';

export const CartWishlistPage = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isCart = pathname === '/cart';

  const cartItems = useAppSelector(selectCartItems);
  const wishlistItems = useAppSelector(selectWishlistItems);

  return (
    <section className={styles.page}>
      <div className={styles.tabs} role="tablist" aria-label="Cart and wishlist">
        <NavLink
          to="/cart"
          role="tab"
          className={({ isActive }) =>
            isActive ? styles.tabActive : styles.tab
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/wishlist"
          role="tab"
          className={({ isActive }) =>
            isActive ? styles.tabActive : styles.tab
          }
        >
          Wishlist
        </NavLink>
      </div>

      {isCart ? (
        cartItems.length === 0 ? (
          <p className={styles.empty}>Cart is empty</p>
        ) : (
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.row}>
                <Link to={`/product/${item.id}`} className={styles.product}>
                  <img
                    className={styles.thumb}
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className={styles.info}>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.price}>${item.price}</span>
                  </div>
                </Link>

                <div className={styles.controls}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            thumbnail: item.thumbnail,
                          }),
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )
      ) : wishlistItems.length === 0 ? (
        <p className={styles.empty}>Wishlist is empty</p>
      ) : (
        <ul className={styles.list}>
          {wishlistItems.map((item) => (
            <li key={item.id} className={styles.row}>
              <Link to={`/product/${item.id}`} className={styles.product}>
                <img
                  className={styles.thumb}
                  src={item.thumbnail}
                  alt={item.title}
                />
                <div className={styles.info}>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.price}>${item.price}</span>
                </div>
              </Link>

              <button
                type="button"
                className={styles.remove}
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
