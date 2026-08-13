import styles from './Badge.module.css';

type BadgeVariant = 'inline' | 'overlay';

type BadgeProps = {
  count: number;
  variant?: BadgeVariant;
};

export const Badge = ({ count, variant = 'inline' }: BadgeProps) => (
  <span className={variant === 'overlay' ? styles.overlay : styles.inline}>
    {count}
  </span>
);
