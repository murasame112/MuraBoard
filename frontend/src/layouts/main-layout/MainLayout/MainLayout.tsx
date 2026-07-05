import DashboardPage from '../../../pages/DashboardPage';
import AppNavigation from '../AppNavigation/AppNavigation';
import styles from './MainLayout.module.css';
import {Routes, Route} from 'react-router';

export default function MainLayout(){
  return(
    <div className={styles.mainLayout}>
			<AppNavigation/>
			<Routes>
				<Route path='/dashboard/*' element={<DashboardPage/>}/>
				<Route path='/user' element={<p>user</p>}/>
			</Routes>
    </div>
  );
}