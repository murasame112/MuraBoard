import styles from './ApplicationsTable.module.css';
import type { Application } from '../../../../shared/models/models';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { useEffect, useState } from 'react';
import type { QueryState } from '../../models/queryState';
import { buildQueryParams } from '../../../../shared/lib/buildQueryParams';
import type { DashboardMode } from '../../../../layouts/main-layout/AppNavigation/AppNavigation';
import type { ApplicationStatus } from '../../../../shared/enums/enums';

type ApplicationsTableProps = {
	setMode: React.Dispatch<React.SetStateAction<DashboardMode>>;
	callMassActionPopup: (selected: Set<number>) => void;
	refreshToken: number;
	queryState: QueryState;
}


export default function ApplicationsTable({setMode, callMassActionPopup, refreshToken, queryState}: ApplicationsTableProps) {
	const { t } = useTranslation();
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<number>>(new Set<number>());
	const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
	const [applications, setApplications] = useState<Application[]>([]);
	const host = import.meta.env.VITE_API_URL;

	const applicationStylesMap: Record<ApplicationStatus, string> = {
		APPLIED: styles.statusApplied,
		IN_PROGRESS: styles.statusInProgress,
		INTERVIEW: styles.statusInterview,
		OFFER: styles.statusOffer,
		REJECTED: styles.statusRejected,
	};

	function selectOffer(id: number){
		setSelectedOffer((prev) => {
			if (!prev) return id;
			else if(prev === id) return null;
			return id;
		})
	}

	useEffect(() => {
		fetchData();
	}, [refreshToken, queryState]);

	useEffect(() => {
		callMassActionPopup(selectedCheckboxes);
	}, [selectedCheckboxes]);

	function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
		let val = e.currentTarget.checked;
		setSelectedCheckboxes(prev => {
			const next = new Set(prev);
			if (val) {
				next.add(id);
			} else {
				next.delete(id);
			}
			
			return next;
		});
	}

	function fetchData() {
		//TODO: userId shouldn't be 4, it's just for development
		const userId = 4;
		const query = buildQueryParams(userId, queryState);
		
		fetch(`${host}/api/application/applications-for-dashboard?${query}`)
			.then((response) => response.json())
			.then((data) => {
				if (!data || data.length == 0){
					setApplications([]);
					return;
				}
				setApplications(data);
				setSelectedCheckboxes(new Set<number>());
			})
			.catch((error) => {
				setApplications([]);
				console.log(error);
			});
	}

	return (
		<div className={styles.applicationsTable}>

			<div className={`${styles.applicationItem} ${styles.detailsHeader}`}>
				<h4>{t('select')}</h4>
				<h4>{t('company')} - {t('position')}</h4>
				<h4>{t('status')}</h4>
				<h4>{t('appliedAt')}</h4>
			</div>

			{applications.length === 0 ? (<p>{t('noApplicationsFound')} - <span className={styles.createOne} onClick={() => setMode('JobOffer')}>{t('applyToOne')}</span>!</p>) : 
			applications.map((element) => (
				
				<div key={element.id} className={styles.applicationItem}>
					<div className={styles.select}><input type='checkbox' name='selectItem' checked={selectedCheckboxes.has(element.id)} onChange={(e) => {handleCheckboxChange(e, element.id)}}/></div>
						<div className={styles.offer} onClick={() => {selectOffer(element.id)}}>
						{
						element.id === selectedOffer && (
							<div className={styles.offerDetails}>
								<p className={styles.offerDetailsName}>{element.jobOffer.position} </p>
								<p>{element.jobOffer.position}</p>
								{element.jobOffer.position ? (
									<a href={element.jobOffer.position} className={styles.offerDetailsWebsite}>{element.jobOffer.position}</a>
								) : (
									<p className={styles.offerDetailsNoWebsite}>{t('noWebsite')}</p>
								)}
								<p className={styles.offerDetailsClose}>{t('companyDetailsClose')}</p>
							</div>
						)}
						<div className={styles.offerName}>
							<p>{element.jobOffer.company.name}</p>
							<p>-</p>
							<p>{element.jobOffer.position}</p>
						</div>
					</div>

					<p className={`${styles.applicationStatus} ${applicationStylesMap[element.status]}`}>{t(element.status)}</p>
					<p>{new Date(element.appliedAt).toLocaleDateString('pl-PL')}</p>
				</div>
			))}

		</div>
	);
}