import styles from './DashboardList.module.css';
import type { JobOffer } from '../../../shared/models/models';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useState, useEffect } from 'react';
import type { DashboardMode } from '../../../pages/DashboardPage';
// import MassActionPopup from '../MassActionPopup/MassActionPopup'; //TODO:

type DashboardListProps = {
	mode: DashboardMode;
	callForm: (type: string) => void;
	callMassActionPopup: (selected: Set<number>) => void;
}

	

export default function DashboardList({mode, callForm, callMassActionPopup}: DashboardListProps){
	const { t } = useTranslation();
	const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<Set<number>>(new Set<number>());
	const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

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

	function selectCompany(id: number){
		setSelectedCompany((prev) => {
			if (!prev) return id;
			else if(prev === id) return null;
			return id;
		})
	}

	function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
		let val = e.currentTarget.checked;
		setSelectedCheckboxes(prev => {
			if (val) {
				prev.add(id);
			} else {
				prev.delete(id);
			}
			return new Set(prev);
		});
	}

	function onDelete(){
		setSelectedCheckboxes(new Set<number>());
		fetchData();
	}

	return(
		<div className={styles.jobOffersList}>

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
			jobOffers.map((element, index) => (
				index > 10 ?  null :
				<div key={element.id} className={styles.jobOfferItem}>
					<div className={styles.select}><input type='checkbox' name='selectItem' onChange={(e) => {handleCheckboxChange(e, element.id)}}/></div>

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
			{/* {(selectedCheckboxes.size > 0) ? <MassActionPopup selected={selectedCheckboxes} onDelete={onDelete}/> : ''} */}
			
		</div>
	);

}