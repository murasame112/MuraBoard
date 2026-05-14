import styles from './DashboardJobOfferForm.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';

export default function DashboardJobOfferForm() {
	const { t } = useTranslation();

	return(
		<div className={styles.jobOfferForm}>
			<form>
				<div className={styles.closeButton}><p>X</p></div>

				<div className={styles.jobOfferFormElement}>
					<label htmlFor='positionInput' className={styles.jobOfferFormLabel}>
						{t('position')}
					</label>
					<input id='positionInput' name='positionInput' type='text' />
				</div>
				
				<div className={styles.jobOfferFormElement}>
					<label htmlFor='salaryMinInput' className={styles.jobOfferFormLabel}>
						{t('salary')}
					</label>
					<p className={styles.additionalFormText}>{t('canBeLeftEmpty')}</p>
					<div className={styles.salaryInputs}>
						<input id='salaryMinInput' name='salaryMinInput' type='text' />
						<input id='salaryMaxInput' name='salaryMaxInput' type='text' />
						<select>
							{/*TODO: enum */}
							<option>unknown</option>
							<option>PLN</option>
							<option>EUR</option>
							<option>USD</option>
						</select>
					</div>
					

				</div>

			</form>
		</div>
	);
}