import styles from './DashboardContent.module.css';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import DashboardStats from '../DashboardStats/DashboardStats';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import DashboardManagement from '../DashboardManagement/DashboardManagement';
import type { JobOffer } from '../../../shared/models/models';
import JobOffersDetails from '../JobOffersDetails/JobOffersDetails';
import ApplicationsDetails from '../ApplicationsDetails/ApplicationsDetails';
import { ApplicationStatus } from '../../../shared/enums/enums';

type DashboardMode = 'JobOffer' | 'Application';

export type CardsData = {label: string, count: number, color: string, icon: React.ElementType;};

export default function DashboardContent(){
	const { t } = useTranslation();
	const [mode, setMode] = useState<DashboardMode>('JobOffer');
	const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
	const host = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchJobOffers = async () => {
			try {
				const offersResponse = await fetch(`${host}/api/joboffer/offers-for-user/4` /*TODO: < shouldn't be 4 */);

				const offersData: {
					id: number;
					title: string;
					salaryMin?: number;
					salaryMax?: number;
					currency: string;
					createdAt: string;
					companyId: number;
				}[] = await offersResponse.json();

				const jobOffersWithCompany = await Promise.all(
					offersData.map(async (offer) => {
						const [companyResponse, applicationsResponse] = await Promise.all([
							fetch(`${host}/api/joboffer/company/${offer.companyId}`),
							fetch(`${host}/api/joboffer/applications-for-offer/${offer.id}`),
						]);

						const companyData: {
							name: string;
							location: string;
							website?: string;
						} = await companyResponse.json();

						const applicationData: {
							status: ApplicationStatus;
						} = await applicationsResponse.json();

						return {
							id: offer.id,
							title: offer.title,
							salaryMin: offer.salaryMin,
							salaryMax: offer.salaryMax,
							createdAt: new Date(offer.createdAt),
							currency: offer.currency,
							companyName: companyData.name,
							companyLocation: companyData.location,
							companyWebsite: companyData.website,
							status: applicationData?.status ?? null,
						};
					})
				);

				setJobOffers(jobOffersWithCompany);
			} catch (error) {
				console.log(error);
			}
		};

		fetchJobOffers();
	}, []);

	const applicationStats = useMemo(() => {
		return jobOffers.reduce(
			(acc, offer) => {
				if (offer.status === null) {
					acc.notApplied += 1;
				} else {
					acc.applied += 1;
				}

				return acc;
			},
			{
				applied: 0,
				notApplied: 0,
			}
		);
	}, [jobOffers]);

	const jobOffersCardsMock = [
		{
			label: t('applied'),
			count: applicationStats.applied,
			color: '--alert-lightblue',
			icon: CheckCircleIcon
		},
		{
			label: t('notApplied'),
			count: applicationStats.notApplied,
			color: '--alert-burgund',
			icon: ClockIcon
		}
	];

	const summaryCountMock = mode === 'JobOffer' ? `${jobOffers.length} ${t('jobOffers')}` : `180 ${t('applications')}`;

  return(
    <div className={styles.dashboardContent}>
			<div className={`${styles.title} ${styles.dshBox}`}><h3>{mode === 'JobOffer' ? t('jobOffers') : t('applications')}</h3></div>
			<DashboardStats className={`${styles.stats} ${styles.dshBox}`} cardsData={jobOffersCardsMock} summaryCount={summaryCountMock}/>
			<DashboardManagement className={`${styles.contentManagement} ${styles.dshBox}`} mode={mode === 'JobOffer' ? t('jobOffer') : t('application')}/>
			<div className={`${styles.details} ${styles.dshBox}`}>{mode === 'JobOffer' ? <JobOffersDetails jobOffers={jobOffers}/> : (<ApplicationsDetails/>)}</div>

			
    </div>
  );
}