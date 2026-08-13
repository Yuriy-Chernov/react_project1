import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

type InputVariant = 'default' | 'ghost';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
};

export const Input = ({
  variant = 'default',
  className,
  ...props
}: InputProps) => (
  <input
    className={[styles.input, styles[variant], className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
