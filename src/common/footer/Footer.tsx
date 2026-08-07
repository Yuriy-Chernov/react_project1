import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
      <p className={styles.text}>Footer Example</p>

        <p className={styles.text}>Copyright 2026</p>
      </div>
    </footer>
  );
};
