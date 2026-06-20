import DashboardPage from '../../../pages/DashboardPage';
import AppNavigation from '../AppNavigation/AppNavigation';
import styles from './MainLayout.module.css';
import type { DashboardMode } from '../AppNavigation/AppNavigation';
import { useState } from 'react';

export default function MainLayout(){
	const [mode, setMode] = useState<DashboardMode>('JobOffer');
  return(
    <div className={styles.mainLayout}>
			<AppNavigation mode={mode} setMode={setMode}/>
			<DashboardPage mode={mode}/>
    </div>
  );
}