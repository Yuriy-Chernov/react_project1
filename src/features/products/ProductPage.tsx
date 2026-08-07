import { Link, useParams } from "react-router-dom";

import { ProductActions } from "../catalog/ProductActions";
import { useGetProductByIdQuery } from "./productsApi";
import styles from "./ProductPage.module.css";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(id ?? "", { skip: !id });

  if (!id) {
    return <p className={styles.status}>Product not found</p>;
  }

  if (isLoading) {
    return <p className={styles.status}>Loading…</p>;
  }

  if (isError || !product) {
    const message =
      error && "status" in error
        ? `Error ${error.status}`
        : "Product not found";
    return (
      <div className={styles.status}>
        <p>{message}</p>
        <Link to="/">← Back to catalog</Link>
      </div>
    );
  }

  return (
    <article className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Back to catalog
      </Link>

      <div className={styles.layout}>
        <img
          className={styles.image}
          src={product.images[0] ?? product.thumbnail}
          alt={product.title}
        />

        <div className={styles.content}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.title}>{product.title}</h1>
          {product.brand ? (
            <p className={styles.brand}>{product.brand}</p>
          ) : null}
          <p className={styles.price}>${product.price}</p>
          <p className={styles.meta}>
            Rating: {product.rating} · In stock: {product.stock}
          </p>
          <p className={styles.description}>{product.description}</p>
          <ProductActions
            variant="page"
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
            }}
          />
        </div>
      </div>
    </article>
  );
};
