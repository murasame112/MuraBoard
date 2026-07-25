import styles from './LoadingSpinner.module.css';

type LoadingSpinnerProps = {
  text?: string;
};

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.loadingSpinner} />
      <p>{text}</p>
    </div>
  );
}