import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../common/footer/Footer';
import { Header } from '../common/header/Header';
import { PageFallback } from '../shared/ui';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<PageFallback padded />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
