import styles from './ErrorBox.module.css';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type ErrorBoxProps = {
  message: string | null;
	className?: string;
}

export default function ErrorBox({message, className}: ErrorBoxProps){
  
  return (
    <div className={`${styles.errorBox} ${className}`}>
      <ExclamationTriangleIcon className={styles.errorIcon}/>
      <span>{message}</span>
    </div>
  );
}