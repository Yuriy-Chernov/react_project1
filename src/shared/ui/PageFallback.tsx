import styles from './PageFallback.module.css';

type PageFallbackProps = {
  message?: string;
  padded?: boolean;
};

export const PageFallback = ({
  message = 'Loading…',
  padded = false,
}: PageFallbackProps) => (
  <p
    className={padded ? `${styles.fallback} ${styles.padded}` : styles.fallback}
    role="status"
  >
    {message}
  </p>
);
