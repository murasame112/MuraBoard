import Dashboard from '../dashboard/Dashboard';
import styles from './MainContent.module.css';

export default function MainContent(){
  return(
    <div className={styles.mainContent}>
      <Dashboard/>
    </div>
  );
}