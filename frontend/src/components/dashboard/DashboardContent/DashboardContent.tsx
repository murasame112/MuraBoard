import styles from './DashboardContent.module.css';
import { useState } from 'react';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import DashboardStats from '../DashboardStats/DashboardStats';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import DashboardManagement from '../DashboardManagement/DashboardManagement';

type DashboardMode = 'JobOffer' | 'Application';

export type CardsData = {label: string, count: number, color: string, icon: React.ElementType;};

export default function DashboardContent(){
	const { t } = useTranslation();
	const [mode, setMode] = useState<DashboardMode>('JobOffer');

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
			<DashboardManagement className={`${styles.contentManagement} ${styles.dshBox}`}/>
			<div className={`${styles.details} ${styles.dshBox}`}>todo: details</div>

			
    </div>
  );
}