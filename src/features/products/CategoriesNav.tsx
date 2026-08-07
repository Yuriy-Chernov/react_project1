import { useNavigate, useSearchParams } from 'react-router-dom';

import { getTopTags } from './getTopTags';
import { useGetProductsQuery } from './productsApi';
import styles from './CategoriesNav.module.css';

export const CategoriesNav = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const { data } = useGetProductsQuery({ limit: 30 });
  const topTags = getTopTags(data?.products ?? [], 6);

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      navigate('/');
      return;
    }

    navigate(`/?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <nav className={styles.categories} aria-label="Categories">
      <ul className={styles.categoryList}>
        {topTags.map((tag) => {
          const isActive = activeTag === tag;

          return (
            <li key={tag}>
              <button
                type="button"
                className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ''}`}
                aria-pressed={isActive}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
