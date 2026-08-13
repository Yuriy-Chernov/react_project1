import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button } from '../../shared/ui';
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
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
  const [orderNotice, setOrderNotice] = useState(false);

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const wishlistItems = useAppSelector(selectWishlistItems);

  useEffect(() => {
    if (!orderNotice) return;

    const timer = window.setTimeout(() => setOrderNotice(false), 3000);
    return () => window.clearTimeout(timer);
  }, [orderNotice]);

  const handleBuy = () => {
    dispatch(clearCart());
    setOrderNotice(true);
  };

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

      {orderNotice ? (
        <p className={styles.notice} role="status">
          Order created
        </p>
      ) : null}

      {isCart ? (
        cartItems.length === 0 ? (
          <p className={styles.empty}>Cart is empty</p>
        ) : (
          <>
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
                      <Button
                        variant="secondary"
                        className={styles.quantityBtn}
                        aria-label="Decrease quantity"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        −
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="secondary"
                        className={styles.quantityBtn}
                        aria-label="Increase quantity"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <p className={styles.total}>
                Total: <span>${cartTotal.toFixed(2)}</span>
              </p>
              <Button className={styles.buy} onClick={handleBuy}>
                Buy
              </Button>
            </div>
          </>
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

              <Button
                variant="ghost"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
