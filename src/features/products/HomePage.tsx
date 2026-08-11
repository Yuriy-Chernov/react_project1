import { Link, useSearchParams } from 'react-router-dom';

import { ProductActions } from '../catalog/ProductActions';
import { CategoriesNav } from './CategoriesNav';
import { FloatingCartButton } from './FloatingCartButton';
import { useGetProductsQuery, useSearchProductsQuery } from './productsApi';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const q = searchParams.get('q')?.trim() ?? '';

  const searchQuery = useSearchProductsQuery({ q, limit: 30 }, { skip: !q });
  const listQuery = useGetProductsQuery({ limit: 32 }, { skip: !!q });

  const { data, isLoading, isError, error } = q ? searchQuery : listQuery;

  if (isLoading) {
    return (
      <>
        <section className={styles.page}>
          <CategoriesNav />
          <p className={styles.status}>Loading products…</p>
        </section>
        <FloatingCartButton />
      </>
    );
  }

  if (isError) {
    const message =
      error && 'status' in error
        ? `Error ${error.status}`
        : 'Failed to load products';
    return (
      <>
        <section className={styles.page}>
          <CategoriesNav />
          <p className={styles.status}>{message}</p>
        </section>
        <FloatingCartButton />
      </>
    );
  }

  const products = data?.products ?? [];
  const filteredProducts =
    activeTag && !q
      ? products.filter((product) => product.tags?.includes(activeTag))
      : products;

  const title = q
    ? `Search: "${q}"`
    : activeTag
      ? `Catalog · ${activeTag}`
      : 'Catalog';

  const emptyMessage = q
    ? `No products found for "${q}"`
    : 'No products for this tag';

  return (
    <>
      <section className={styles.page}>
        <CategoriesNav />
        <h1 className={styles.title}>{title}</h1>

        {filteredProducts.length === 0 ? (
          <p className={styles.empty}>{emptyMessage}</p>
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
      <FloatingCartButton />
    </>
  );
};
