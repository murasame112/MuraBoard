import styles from './DashboardJobOfferForm.module.css';
import { useState } from 'react';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import CompanyCombobox from './CompanyCombobox/CompanyCombobox';
import { Currency } from '../../../shared/enums/enums';
import type { Company } from '../../../shared/models/models';

type DashboardJobOfferFormProps = {
	close: () => void;
}


export default function DashboardJobOfferForm({close}: DashboardJobOfferFormProps) {
	const { t } = useTranslation();

	type FormFields =
    | 'position'
    | 'salaryMin'
    | 'salaryMax'
    | 'currency'
    | 'company';

	type FormValues = {
		position: string;
		salaryMin: string;
		salaryMax: string;
		currency: Currency | string;
		company: Company | null;
	}

	const validationRegister: Record<FormFields, () => void> = {
		position: () => validatePosition(),
		salaryMin: () => validateSalaryMin(),
		salaryMax: () => validateSalaryMax(),
		currency: () => validateCurrency(),
		company: () => validateCompany()
	}

	const [errors, setErrors] = useState<Record<FormFields, string | null>>({
		position: t('formError.positionRequired'),
		salaryMin: null,
		salaryMax: null,
		currency: null,
		company: t('formError.companyRequired')
	});

	const [values, setValues] = useState<FormValues>({
		position: '',
		salaryMin: '',
		salaryMax: '',
		currency: 'unknown',
		company: null
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		let value = e.currentTarget.value;
		let name = e.currentTarget.name;

		switch (name) {
			case 'position':
				//TODO: first validation (no numbers)
				// value = value.replace(positionReplaceRegex, '');
				break;
			case 'salaryMin':
			case 'salaryMax':
				// value = value.replace()		numbers and ,. only
				break;
			case 'currency':
				//TODO: is this needed?
				break;
			case 'company':
				//TODO: is this needed? it should probably be done in <CompanyCombobox/>
				break;
		}
		setValues(prev => ({...prev, [name]: value}));
	}

	function validate(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
		const currentValidation = validationRegister[e.currentTarget.name as FormFields];
		if (currentValidation){
			currentValidation();
		}
	}

	function validateSubmit() {
		//TODO:
	}

	function validatePosition() {
		//TODO:
	}

	function validateSalaryMin() {
		//TODO:
	}

	function validateSalaryMax() {
		//TODO:
	}

	function validateCurrency() {
		//TODO:
	}

	function validateCompany() { 
		//TODO:
	}
	

	return(
		<div className={styles.jobOfferFormWrapper}>
			<div className={styles.jobOfferForm}>
				<form>
					<div className={styles.closeButton}><button type='button' onClick={close}>X</button></div>

					<div className={styles.jobOfferFormElement}>
						<label htmlFor='positionInput' className={styles.jobOfferFormLabel}>
							{t('position')}
						</label>
						<input id='positionInput' name='positionInput' type='text' onChange={handleChange} onBlur={validate} value={values.position}/>
					</div>
					
					<div className={styles.jobOfferFormElement}>
						<label htmlFor='salaryMinInput' className={styles.jobOfferFormLabel}>
							{t('salary')}
						</label>
						<p className={styles.additionalFormText}>{t('canBeLeftEmpty')}</p>
						<div className={styles.salaryInputs}>
							<input id='salaryMinInput' name='salaryMinInput' type='text' onChange={handleChange} onBlur={validate} value={values.salaryMin}/>
							<input id='salaryMaxInput' name='salaryMaxInput' type='text' onChange={handleChange} onBlur={validate} value={values.salaryMax}/>
							<div className={styles.selectWrapper}>
								<ChevronDownIcon className={styles.selectArrowIcon}/>
								<select onChange={handleChange} onBlur={validate} value={values.currency}>
									<option value='unknown'>{t('unknown')}</option>
									{Object.values(Currency).map((element) => 
										<option key={element} value={element}>{element}</option>
									)}
								</select>
							</div>
						</div>					
					</div>
					<div className={styles.jobOfferFormElement}>
						<label htmlFor='comboboxSelect' className={styles.jobOfferFormLabel}>{t('company')}</label>
						<CompanyCombobox labelClass={styles.jobOfferFormLabel} additionalFormTextClass={styles.additionalFormText}  />
					</div>

					<div className={styles.jobOfferFormSubmit}>
						<button type='submit'>{t('submitJobOffer')}</button>
					</div>

				</form>
			</div>
		</div>
		
	);
}