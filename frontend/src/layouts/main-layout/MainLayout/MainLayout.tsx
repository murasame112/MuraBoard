import AppNavigation from '../AppNavigation/AppNavigation';
import styles from './MainLayout.module.css';
import { Outlet } from 'react-router';

export default function MainLayout(){
  return(
    <div className={styles.mainLayout}>
			<AppNavigation/>
			<Outlet />
    </div>
  );
}