import styles from './DashboardJobOfferForm.module.css';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import CompanyCombobox from './CompanyCombobox/CompanyCombobox';
import ErrorBox from './ErrorBox/ErrorBox';
import { Currency } from '../../../shared/enums/enums';
import type { Company } from '../../../shared/models/models';

type DashboardJobOfferFormProps = {
	close: () => void;
}

export type CompanyData = {
	id: number | null;
	name: string;
	location: string;
	website: string | null;
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
		position: null,
		salaryMin: null,
		salaryMax: null,
		currency: null,
		company: null
	});

	//TODO: display errors properly
	useEffect(() => {
		//console.log(Object.values(errors).map((element) => element !== null).join(', '));
		console.log(errors);
	}, [errors]);

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
				value = value.replace(/[^a-zA-ZÀ-ÿąĄćĆęĘłŁńŃóÓśŚżŻźŹ\s\-+.#()/]/g, '');
				break;
			case 'salaryMin':
			case 'salaryMax':
				value = value.replace(/\D/g, '');
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
		//TODO: runs through errors
	}

	function validatePosition() {
		let value = values.position.trim();

		if (value.length === 0) {
			setErrors(prev => ({...prev, position: t('formError.positionRequired')}));
			return;
		}

		if (value.length < 5) {
			setErrors(prev => ({...prev, position: t('formError.positionTooShort')}));
			return;
		}

		if (value.length > 80){
			setErrors(prev => ({...prev, position: t('formError.positionTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, position: null}));
	}

	function validateSalaryMin() {
		let value = Number(values.salaryMin);
		
		if (!isNaN(value) || value === 0) {
			setErrors(prev => ({...prev, salaryMin: null}));
		}

		if (value < 0) {
			setErrors(prev => ({...prev, salaryMin: t('formError.salaryNegative')}));
			return;
		}

		if (value > 999999999) {
			setErrors(prev => ({...prev, salaryMin: t('formError.salaryTooHigh')}));
			return;
		}

		if (
			!isNaN(Number(values.salaryMax)) &&
			Number(values.salaryMax) !== 0 &&
			Number(values.salaryMax) < value
		) {
			setErrors(prev => ({...prev, salaryMax: t('formError.salaryMinMustBeLower')}));
			return;
		}

		setErrors(prev => ({...prev, salaryMin: null}));
	}

	function validateSalaryMax() {
		let value = Number(values.salaryMax);

		if (!isNaN(value) || value === 0) {
			setErrors(prev => ({...prev, salaryMax: null}));
		}

		if (value < 0) {
			setErrors(prev => ({...prev, salaryMax: t('formError.salaryNegative')}));
			return;
		}

		if (value > 999999999) {
			setErrors(prev => ({...prev, salaryMax: t('formError.salaryTooHigh')}));
			return;
		}

		if (
			!isNaN(Number(values.salaryMin)) &&
			Number(values.salaryMin) !== 0 &&
			Number(values.salaryMin) > value
		) {
			setErrors(prev => ({...prev, salaryMax: t('formError.salaryMinMustBeLower')}));
			return;
		}

		setErrors(prev => ({...prev, salaryMax: null}));
	}

	function validateCurrency() {
		let value = values.currency;

		if (
			value !== 'unknown' &&
			!Object.values(Currency).includes(value as Currency)
		) {
			setErrors(prev => ({...prev, currency: t('formError.wrongCurrency')}));
			return;
		}
	}

	function validateCompany() { 
		// validate name, validate location, validate website
	}

	function getCompany(company: CompanyData) {
		console.log(company);
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
						<div className={styles.inputWrapper}>
							<input className={styles.positionInput} id='positionInput' name='position' type='text' onChange={handleChange} onBlur={validate} value={values.position}/>
							{errors.position ? <ErrorBox message={errors.position} /> : ''}
						</div>
						
					</div>
					
					<div className={styles.jobOfferFormElement}>
						<label htmlFor='salaryMinInput' className={styles.jobOfferFormLabel}>
							{t('salary')}
						</label>
						<p className={styles.additionalFormText}>{t('canBeLeftEmpty')}</p>
						<div className={styles.salaryInputsBox}>
							<div className={styles.inputWrapper}>
								<input className={styles.salaryInput} id='salaryMinInput' name='salaryMin' type='text' onChange={handleChange} onBlur={validate} value={values.salaryMin}/>
								{errors.salaryMin ? <ErrorBox message={errors.salaryMin} /> : ''}
							</div>
							<div className={styles.inputWrapper}>
								<input className={styles.salaryInput} id='salaryMaxInput' name='salaryMax' type='text' onChange={handleChange} onBlur={validate} value={values.salaryMax}/>
								{errors.salaryMax ? <ErrorBox message={errors.salaryMax} /> : ''}
							</div>
							<div className={styles.selectWrapper}>
								<ChevronDownIcon className={styles.selectArrowIcon}/>
								<select name='currency' onChange={handleChange} onBlur={validate} value={values.currency}>
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
						<CompanyCombobox labelClass={styles.jobOfferFormLabel} additionalFormTextClass={styles.additionalFormText} getCompany={getCompany}  />
					</div>

					<div className={styles.jobOfferFormSubmit}>
						<button type='submit'>{t('submitJobOffer')}</button>
					</div>

				</form>
			</div>
		</div>
		
	);
}