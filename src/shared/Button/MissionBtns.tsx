import styles from './styles.module.css';

type SubmitProps = {
  isDirty: boolean;
  isValid: boolean;
  label: string;
};
type DraftProps = {
  isDirty: boolean;
  isValid: boolean;
  label: string;
  saveAsDraft: () => void;
};

export const DraftBtn = ({
  isDirty,
  isValid,
  label,
  saveAsDraft,
}: DraftProps) => {
  return (
    <button
      type='button'
      onClick={saveAsDraft}
      disabled={!isValid}
      className={`${styles.btn} ${
        isDirty && isValid ? styles.btn_primary_outline_1 : styles.btn_disabled
      }`}
    >
      {label}
    </button>
  );
};

export const SubmitBtn = ({ isDirty, isValid, label }: SubmitProps) => {
  return (
    <button
      type='submit'
      disabled={!isValid}
      className={`${styles.btn} ${
        isDirty && isValid ? styles.btn_primary_1 : styles.btn_disabled
      }`}
    >
      {label}
    </button>
  );
};
