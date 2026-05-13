import styles from './JobOffersDetails.module.css';
import type { JobOffer } from '../../../shared/models/models';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useState } from 'react';

type JobOffersDetailsProps = {
	jobOffers: JobOffer[];
}

export default function JobOffersDetails({jobOffers}: JobOffersDetailsProps){
	const { t } = useTranslation();
	const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

	function selectCompany(id: number){
		setSelectedCompany((prev) => {
			console.log(prev);
			if (!prev) return id;
			return null;
		})
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

			{jobOffers.length === 0 ? (<p>{t('noJobOffers')}</p>) : 
			jobOffers.map((element) => (
				<div key={element.id} className={styles.jobOfferItem}>
					<div className={styles.select}><input type='checkbox' name='selectItem'/></div>

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
					<p>{element.title}</p>
					<p>{element.salaryMin} - {element.salaryMax}</p>
					<p>{element.currency}</p>
					<p>{new Date(element.createdAt).toLocaleDateString('pl-PL')}</p>
				</div>
			))}
		</div>
	);

}