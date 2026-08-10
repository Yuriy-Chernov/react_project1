import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../common/footer/Footer';
import { Header } from '../common/header/Header';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
