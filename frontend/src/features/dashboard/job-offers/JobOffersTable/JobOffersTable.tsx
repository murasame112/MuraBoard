import styles from './JobOffersTable.module.css';
import type { JobOffer } from '../../../../shared/models/models';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { useEffect, useState } from 'react';
import type { DashboardFormType } from '../../DashboardFormWrapper/DashboardFormWrapper';


type JobOffersTableProps = {
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	callMassActionPopup: (selected: Set<number>) => void;
	currentPage: number;
	pageSize: number;
	refreshToken: number;
	searchPhrase: string;
}

export default function JobOffersTable({callForm, callMassActionPopup, currentPage, pageSize, refreshToken, searchPhrase}: JobOffersTableProps){
	const { t } = useTranslation();
	const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<number>>(new Set<number>());
	const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
	const host = import.meta.env.VITE_API_URL;

	function selectCompany(id: number){
		setSelectedCompany((prev) => {
			if (!prev) return id;
			else if(prev === id) return null;
			return id;
		})
	}

	useEffect(() => {
		fetchData();
	}, [refreshToken, currentPage, searchPhrase, pageSize]);

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
		fetch(`${host}/api/joboffer/offers-for-dashboard?userId=${userId}&page=${currentPage}&pageSize=${pageSize}&searchPhrase=${searchPhrase}`)
			.then((response) => response.json())
			.then((data) => {
				if (!data || data.length == 0){
					setJobOffers([]);
					return;
				}
				setJobOffers(data);
				setSelectedCheckboxes(new Set<number>());
			})
			.catch((error) => {
				setJobOffers([]);
				console.log(error);
			});
	}

	return(
		<div className={styles.jobOffersTable}>

			<div className={`${styles.jobOfferItem} ${styles.detailsHeader}`}>
				<h4>{t('select')}</h4>
				<h4>{t('company')}</h4>
				<h4>{t('status')}</h4>
				<h4>{t('position')}</h4>
				<h4>{t('salary')}</h4>
				<h4>{t('currency')}</h4>
				<h4>{t('date')}</h4>
			</div>

			{jobOffers.length === 0 ? (<p>{t('noJobOffersFound')} - <span className={styles.createOne} onClick={() => callForm('add')}>{t('createOne')}</span>!</p>) : 
			jobOffers.map((element) => (
				<div key={element.id} className={styles.jobOfferItem}>
					<div className={styles.select}><input type='checkbox' name='selectItem' checked={selectedCheckboxes.has(element.id)} onChange={(e) => {handleCheckboxChange(e, element.id)}}/></div>

					<div className={styles.companyName} onClick={() => {selectCompany(element.id)}}>
					{element.id === selectedCompany && (
						<div className={styles.companyDetails}>
							<p className={styles.companyDetailsName}>{element.company.name}</p>
							<p>{element.company.location}</p>
							{element.company.website ? (
								<a href={element.company.website} className={styles.companyDetailsWebsite}>{element.company.website}</a>
							) : (
								<p className={styles.companyDetailsNoWebsite}>{t('noWebsite')}</p>
							)}
							<p className={styles.companyDetailsClose}>{t('companyDetailsClose')}</p>
						</div>
					)}
					<span className={styles.companyNameText}>{element.company.name}</span>
				</div>

					<p className={`${styles.offerStatus} ${element.application ? styles.applied : styles.notApplied }`}>{element.application ? t('applied'): t('notApplied') }</p>
					<p>{element.position}</p>
					<p>{element.salaryMin} - {element.salaryMax}</p>
					<p>{element.currency}</p>
					<p>{new Date(element.createdAt).toLocaleDateString('pl-PL')}</p>
				</div>
			))}
			
		</div>
	);

}