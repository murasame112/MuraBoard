import styles from './JobOffersDetails.module.css';
import type { JobOffer } from '../../../shared/models/models';
import { useTranslation } from '../../../shared/i18n/useTranslation';

type JobOffersDetailsProps = {
	jobOffers: JobOffer[];
}

export default function JobOffersDetails({jobOffers}: JobOffersDetailsProps){
	const { t } = useTranslation();
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
					<p className={styles.companyDetails}>{element.company.name}</p>
					<p className={`${styles.offerStatus} ${element.application ? styles.applied : styles.notApplied }`}>{element.application ? t('applied'): t('notApplied') }</p>
					<p>{element.title}</p>
					<p>{element.salaryMin} - {element.salaryMax}</p>
					<p>{element.currency}</p>
					<p>{/*element.createdAt.toLocaleDateString('pl-PL')*/}</p>
				</div>
			))}
		</div>
	);

}