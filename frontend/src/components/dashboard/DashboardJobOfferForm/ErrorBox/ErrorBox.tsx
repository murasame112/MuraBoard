import styles from './ErrorBox.module.css';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type ErrorBoxProps = {
  message: string;
}

export default function ErrorBox({message}: ErrorBoxProps){
  return (
    <div className={styles.errorBox}>
      <ExclamationTriangleIcon className={styles.errorIcon}/>
      <span>{message}</span>
    </div>
  );
}