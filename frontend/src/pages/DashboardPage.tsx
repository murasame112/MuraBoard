import styles from './DashboardPage.module.css';
import { useState, useEffect} from 'react';
import { useTranslation } from '../shared/i18n/useTranslation';
import DashboardStats from '../features/dashboard/DashboardStats/DashboardStats';

// import DashboardManagement from '../DashboardManagement/DashboardManagement';
import DashboardControls from '../features/dashboard/DashboardControls/DashboardControls';
import type { JobOffer } from '../shared/models/models';
import DashboardList from '../features/dashboard/DashboardList/DashboardList';
import type { DashboardMode } from '../layouts/main-layout/AppNavigation/AppNavigation';
// import DashboardJobOffersDetails from '../DashboardJobOffersDetails/DashboardJobOffersDetails';
// import DashboardApplicationsDetails from '../DashboardApplicationsDetails/DashboardApplicationsDetails';

type DashboardPageProps = {
	mode: DashboardMode;
}

export default function DashboardPage({mode}: DashboardPageProps){
	const formConfiguration = { isDisplayed: false, type: 'add', mode: mode } //TODO: state
	const { t } = useTranslation();

	function callForm(type: string /*TODO: type it properly, either 'add' or 'edit'*/){
		//TODO: implement call form
		console.log('form called');
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
			{/* TODO: form with mode and type (edit/add), based on formConfig */}
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