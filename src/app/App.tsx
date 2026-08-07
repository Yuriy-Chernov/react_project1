import { Navigate, Route, Routes } from 'react-router-dom';

import { Footer } from '../common/footer/Footer';
import { Header } from '../common/header/Header';
import { ProtectedRoute } from '../common/ProtectedRoute';
import { LoginPage } from '../features/auth/LoginPage/LoginPage';
import { CartWishlistPage } from '../features/catalog/CartWishlistPage';
import { HomePage } from '../features/products/HomePage';
import { ProductPage } from '../features/products/ProductPage';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartWishlistPage />} />
            <Route path="/wishlist" element={<CartWishlistPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
