import DashboardPage from '../../../pages/DashboardPage';
import AppNavigation from '../AppNavigation/AppNavigation';
import styles from './MainLayout.module.css';

export default function MainLayout(){
  return(
    <div className={styles.mainLayout}>
			<AppNavigation/>
			<DashboardPage/>
    </div>
  );
}