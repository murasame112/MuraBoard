import styles from './DashboardPage.module.css';
import { useState, useEffect} from 'react';
import { useTranslation } from '../shared/i18n/useTranslation';
import DashboardStats from '../features/dashboard/DashboardStats/DashboardStats';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
// import DashboardManagement from '../DashboardManagement/DashboardManagement';
import DashboardControls from '../features/dashboard/DashboardControls/DashboardControls';
import type { JobOffer } from '../shared/models/models';
import DashboardList from '../features/dashboard/DashboardList/DashboardList';
import type { DashboardMode } from '../layouts/main-layout/AppNavigation/AppNavigation';
// import DashboardJobOffersDetails from '../DashboardJobOffersDetails/DashboardJobOffersDetails';
// import DashboardApplicationsDetails from '../DashboardApplicationsDetails/DashboardApplicationsDetails';

type Stats = {
	applied: number;
	notApplied: number;
}

export type CardsData = {
    label: string;
    count: number;
    color: string;
    icon: React.ElementType;
};

type DashboardPageProps = {
	mode: DashboardMode;
}

//TODO: Fetch i tak powinien tu być - w końcu na Table bedzie to paginowane
// niekoniecznie musi być to jakiś PEŁEN fetch - nie trzeba chyba pobierać wszystkich job offers, raczej po prostu tylko ich statystyki do stats xd

export default function DashboardPage({mode}: DashboardPageProps){
	const { t } = useTranslation();
	const [addJobOfferCalled, setAddJobOfferCalled] = useState<boolean>(false);
	const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
	const [stats, setStats] = useState<Stats>({applied: 0, notApplied: 0});
	const host = import.meta.env.VITE_API_URL;

	const jobOffersCards = [
		{
			label: t('applied'),
			count: stats.applied,
			color: '--alert-lightblue',
			icon: CheckCircleIcon
		},
		{
			label: t('notApplied'),
			count: stats.notApplied,
			color: '--alert-burgund',
			icon: ClockIcon
		}
	];

	function addJobOffer(){
		setAddJobOfferCalled(true);
	}

	function onFormClose(){
		setAddJobOfferCalled(false);
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
					cardsData={jobOffersCards}
					mode={mode}
					summaryCount={`${jobOffers.length} ${t('jobOffers')}` }
			/>
			<DashboardControls
					className={`${styles.dashboardControls} ${styles.dashboardSection}`}
					mode={mode}
					addJobOfferCalled={addJobOfferCalled}
			/>
			<div className={`${styles.dashboardSection}`}>
				<DashboardList 
						addJobOffer={addJobOffer}
						mode={mode}/>
			</div>
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