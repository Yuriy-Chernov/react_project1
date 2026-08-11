import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '../common/ProtectedRoute';
import App from './App';

const LoginPage = lazy(() =>
  import('../features/auth/LoginPage/LoginPage').then((m) => ({
    default: m.LoginPage,
  })),
);
const HomePage = lazy(() =>
  import('../features/products/HomePage').then((m) => ({
    default: m.HomePage,
  })),
);
const ProductPage = lazy(() =>
  import('../features/products/ProductPage').then((m) => ({
    default: m.ProductPage,
  })),
);
const CartWishlistPage = lazy(() =>
  import('../features/catalog/CartWishlistPage').then((m) => ({
    default: m.CartWishlistPage,
  })),
);
const IconsPage = lazy(() =>
  import('../common/icons/IconsPage').then((m) => ({
    default: m.IconsPage,
  })),
);


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'product/:id',
            element: <ProductPage />,
          },
          {
            path: 'cart',
            element: <CartWishlistPage />,
          },
          {
            path: 'wishlist',
            element: <CartWishlistPage />,
          },
          {
            path: 'icons',
            element: <IconsPage />,
          },
        ],
      },

      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
