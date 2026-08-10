import { Link, useSearchParams } from 'react-router-dom';

import { ProductActions } from '../catalog/ProductActions';
import { CategoriesNav } from './CategoriesNav';
import { useGetProductsQuery } from './productsApi';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const { data, isLoading, isError, error } = useGetProductsQuery({ limit: 30 });

  if (isLoading) {
    return (
      <section className={styles.page}>
        <CategoriesNav />
        <p className={styles.status}>Loading products…</p>
      </section>
    );
  }

  if (isError) {
    const message =
      error && 'status' in error ? `Error ${error.status}` : 'Failed to load products';
    return (
      <section className={styles.page}>
        <CategoriesNav />
        <p className={styles.status}>{message}</p>
      </section>
    );
  }

  const products = data?.products ?? [];
  const filteredProducts = activeTag
    ? products.filter((product) => product.tags?.includes(activeTag))
    : products;

  return (
    <section className={styles.page}>
      <CategoriesNav />
      <h1 className={styles.title}>
        {activeTag ? `Catalog · ${activeTag}` : 'Catalog'}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className={styles.empty}>No products for this tag</p>
      ) : (
        <ul className={styles.grid}>
          {filteredProducts.map((product) => (
            <li key={product.id} className={styles.card}>
              <Link to={`/product/${product.id}`} className={styles.item}>
                <img
                  className={styles.thumb}
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />
                <div className={styles.info}>
                  <h2 className={styles.name}>{product.title}</h2>
                  <p className={styles.price}>${product.price}</p>
                </div>
              </Link>
              <ProductActions
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail,
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
