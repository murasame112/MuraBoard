import styles from './DashboardPage.module.css';
import { useTranslation } from '../shared/i18n/useTranslation';
import type { DashboardMode } from '../layouts/main-layout/AppNavigation/AppNavigation';
import type { DashboardFormType } from '../features/dashboard/DashboardFormWrapper/DashboardFormWrapper';
import { useState } from 'react';
import DashboardStats from '../features/dashboard/DashboardStats/DashboardStats';
import DashboardControls from '../features/dashboard/DashboardControls/DashboardControls';
import DashboardList from '../features/dashboard/DashboardList/DashboardList';
import DashboardFormWrapper from '../features/dashboard/DashboardFormWrapper/DashboardFormWrapper';


type DashboardPageProps = {
	mode: DashboardMode;
}

export default function DashboardPage({mode}: DashboardPageProps){
	const [formConfiguration, setFormConfiguration] = useState<{isDisplayed: boolean, type: DashboardFormType}>({isDisplayed: false, type: 'add'});
	const { t } = useTranslation();

	function callForm(type: DashboardFormType /*TODO: type it properly, either 'add' or 'edit'*/){
		setFormConfiguration({isDisplayed: true, type});	
	}

	function onFormClose(){
		setFormConfiguration((prev) => ({ ...prev, isDisplayed: false}))
	}

	function callMassActionPopup(selected: Set<number>){
		//TODO: implement call mass action popup
		console.log('mass action popup called');
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
				/>
			</div>
			{formConfiguration.isDisplayed ? <DashboardFormWrapper type={formConfiguration.type} mode={mode} onFormClose={onFormClose}/> : ''}

			{/* <div className={`${styles.details} ${styles.dashboardSection}`}>
					{mode === 'JobOffer' ? (
							<DashboardJobOffersDetails
									jobOffers={jobOffers}
									refetch={fetchData}
									addJobOffer={addJobOffer}
							/>
					) : (
							<DashboardApplicationsDetails />
					)}
			</div> */}
    </div>
  )
}