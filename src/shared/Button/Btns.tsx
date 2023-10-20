import { ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export const PrimaryBtn_1 = ({ onClick, children, ...props }: Props) => {
  const handleClick = onClick != null ? onClick : () => {};

  return (
    <button
      className={`${styles.btn} ${styles.btn_primary_1}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const DangerBtn = ({ onClick, children, ...props }: Props) => {
  const handleClick = onClick != null ? onClick : () => {};

  return (
    <button
      className={`${styles.btn} ${styles.btn_danger}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
