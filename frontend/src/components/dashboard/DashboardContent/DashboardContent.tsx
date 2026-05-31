import styles from './DashboardContent.module.css';
import { useState, useEffect} from 'react';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import DashboardStats from '../DashboardStats/DashboardStats';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import DashboardManagement from '../DashboardManagement/DashboardManagement';
import type { JobOffer } from '../../../shared/models/models';
import DashboardJobOffersDetails from '../DashboardJobOffersDetails/DashboardJobOffersDetails';
import DashboardApplicationsDetails from '../DashboardApplicationsDetails/DashboardApplicationsDetails';

type DashboardMode = 'JobOffer' | 'Application';

type Stats = {
	applied: number;
	notApplied: number;
}

export type CardsData = {label: string, count: number, color: string, icon: React.ElementType;};

export default function DashboardContent(){
	const { t } = useTranslation();
	const [mode, setMode] = useState<DashboardMode>('JobOffer');
	const [addJobOfferCalled, setAddJobOfferCalled] = useState<boolean>(false);
	const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
	const [stats, setStats] = useState<Stats>({applied: 0, notApplied: 0});
	const host = import.meta.env.VITE_API_URL;

	useEffect(() => {
		fetchData()
	}, []);

	function fetchData() {
		//TODO: userId shouldn't be 4, it's just for development
		fetch(`${host}/api/joboffer/offers-for-dashboard/4`)
			.then((response) => response.json())
			.then((data) => {
				if (!data.offers || data.offers.length == 0){
					setJobOffers([]);
					return;
				}
				setJobOffers(data.offers);
				setStats(data.stats);
			})
			.catch((error) => console.log(error));
	}

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

	const summaryCountMock = mode === 'JobOffer' ? `${jobOffers.length} ${t('jobOffers')}` : `180 ${t('applications')}`;

	function addJobOffer(){
		setAddJobOfferCalled(true);
	}

	function onFormClose(){
		setAddJobOfferCalled(false);
	}

  return(
    <div className={styles.dashboardContent}>
			<div className={`${styles.title} ${styles.dshBox}`}><h3>{mode === 'JobOffer' ? t('jobOffers') : t('applications')}</h3></div>
			<DashboardStats className={`${styles.stats} ${styles.dshBox}`} cardsData={jobOffersCards} summaryCount={summaryCountMock}/>
			<DashboardManagement className={`${styles.contentManagement} ${styles.dshBox}`} mode={mode} addJobOfferCalled={addJobOfferCalled} onFormClose={onFormClose} refetch={fetchData}/>
			<div className={`${styles.details} ${styles.dshBox}`}>{mode === 'JobOffer' ? <DashboardJobOffersDetails jobOffers={jobOffers} refetch={fetchData} addJobOffer={addJobOffer}/> : (<DashboardApplicationsDetails/>)}</div>

			
    </div>
  );
}