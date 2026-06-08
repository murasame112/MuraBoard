import styles from './DashboardPage.module.css';
import { useTranslation } from '../shared/i18n/useTranslation';
import type { DashboardMode } from '../layouts/main-layout/AppNavigation/AppNavigation';
import type { DashboardFormType } from '../features/dashboard/DashboardFormWrapper/DashboardFormWrapper';
import { useState } from 'react';
import DashboardStats from '../features/dashboard/DashboardStats/DashboardStats';
import DashboardControls from '../features/dashboard/DashboardControls/DashboardControls';
import DashboardList from '../features/dashboard/DashboardList/DashboardList';
import DashboardFormWrapper from '../features/dashboard/DashboardFormWrapper/DashboardFormWrapper';
import MassActionPopup from '../features/dashboard/MassActionPopup/MassActionPopup';


type DashboardPageProps = {
	mode: DashboardMode;
}

export default function DashboardPage({mode}: DashboardPageProps){
	const [formConfiguration, setFormConfiguration] = useState<{isDisplayed: boolean, type: DashboardFormType, selected?: Set<number>}>({isDisplayed: false, type: 'add', selected: new Set<number>()});
	const [massActionPopupConfiguration, setMassActionPopupConfiguration] = useState<{selected: Set<number>}>({selected: new Set<number>()});
	const [refreshToken, setRefreshToken] = useState<number>(0);
	const { t } = useTranslation();

	function callForm(type: DashboardFormType, selected?: Set<number>){
		setFormConfiguration({isDisplayed: true, type, selected});	
	}

	function onFormClose(){
		setFormConfiguration((prev) => ({ ...prev, isDisplayed: false}))
	}

	function onFormSubmit() {
		setRefreshToken((prev) => prev + 1);
	}

	function callMassActionPopup(selected: Set<number>){
		setMassActionPopupConfiguration({
			selected: new Set(selected)
		});
	}

	function onDelete(){
		setRefreshToken((prev) => prev + 1);
		setMassActionPopupConfiguration((prev) => ({...prev, isDisplayed: false}));
	}

  return(
    <div className={styles.dashboardPage}>
			<div className={`${styles.title} ${styles.dashboardSection}`}>
					<h3>
							{mode === 'JobOffer' ? t('jobOffers') : t('applications')}
					</h3>
			</div>
			<DashboardStats
					className={`${styles.stats} ${styles.dashboardSection}`}
					mode={mode}
					refreshToken={refreshToken}
			/>
			<DashboardControls
					className={`${styles.dashboardControls} ${styles.dashboardSection}`}
					mode={mode}
					callForm={callForm}
			/>
			<div className={`${styles.dashboardSection}`}>
				<DashboardList 
						mode={mode}
						callForm={callForm}
						callMassActionPopup={callMassActionPopup}
						refreshToken={refreshToken}
				/>
			</div>
			{formConfiguration.isDisplayed ? <DashboardFormWrapper mode={mode} type={formConfiguration.type} selected={formConfiguration.selected} onFormClose={onFormClose} onFormSubmit={onFormSubmit}/> : ''}
			{massActionPopupConfiguration.selected.size > 0 ? <MassActionPopup mode={mode} selected={massActionPopupConfiguration.selected} callForm={callForm} onDelete={onDelete} />: ''}
    </div>
  )
}