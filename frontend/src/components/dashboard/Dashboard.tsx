import styles from './Dashboard.module.css';
import DashboardContent from './DashboardContent/DashboardContent';
import DashboardNav from './DashboardNav/DashboardNav';

export default function Dashboard(){
  return(
    <div className={styles.dashboard}>
      <DashboardNav/>
      <DashboardContent/>
    </div>
  )
}