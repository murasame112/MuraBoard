import styles from './DashboardContent.module.css';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import DashboardStats from '../DashboardStats/DashboardStats';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import DashboardManagement from '../DashboardManagement/DashboardManagement';
import type { JobOffer } from '../../../shared/models/models';
import JobOffersDetails from '../JobOffersDetails/JobOffersDetails';
import ApplicationsDetails from '../ApplicationsDetails/ApplicationsDetails';

type DashboardMode = 'JobOffer' | 'Application';

export type CardsData = {label: string, count: number, color: string, icon: React.ElementType;};

export default function DashboardContent(){
	const { t } = useTranslation();
	const [mode, setMode] = useState<DashboardMode>('JobOffer');
	const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
	const host = import.meta.env.VITE_API_URL;


	useEffect(() => {
		fetch(`${host}/api/joboffer/offers-for-user/4`/* TODO: just for development purposes */)
				.then((response) => response.json())
				.then((data) => {
					setJobOffers(data);
				})
				.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		console.log(jobOffers);
	}, [jobOffers]);

	const jobOffersCardsMock = [
		{
			label: t('applied'),
			count: 153,
			color: '--alert-lightblue',
			icon: CheckCircleIcon
		},
		{
			label: t('notApplied'),
			count: 27,
			color: '--alert-burgund',
			icon: ClockIcon
		}
	];

	const summaryCountMock = mode === 'JobOffer' ? `180 ${t('jobOffers')}` : `180 ${t('applications')}`;

  return(
    <div className={styles.dashboardContent}>
			<div className={`${styles.title} ${styles.dshBox}`}><h3>{mode === 'JobOffer' ? t('jobOffers') : t('applications')}</h3></div>
			<DashboardStats className={`${styles.stats} ${styles.dshBox}`} cardsData={jobOffersCardsMock} summaryCount={summaryCountMock}/>
			<DashboardManagement className={`${styles.contentManagement} ${styles.dshBox}`} mode={mode === 'JobOffer' ? t('jobOffer') : t('application')}/>
			<div className={`${styles.details} ${styles.dshBox}`}>{mode === 'JobOffer' ? <JobOffersDetails jobOffers={jobOffers}/> : (<ApplicationsDetails/>)}</div>

			
    </div>
  );
}