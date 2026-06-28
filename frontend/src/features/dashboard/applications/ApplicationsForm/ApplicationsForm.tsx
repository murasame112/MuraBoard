import styles from './ApplicationsForm.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import ErrorBox from '../../../../shared/ui/ErrorBox/ErrorBox';
import { ApplicationStatus } from '../../../../shared/enums/enums';

type ApplicationsFormProps = {
	onClose: () => void;
	onSubmit: () => void;
	selectedId?: number;
}

export default function ApplicationsForm({onClose, onSubmit, selectedId}: ApplicationsFormProps){
	const { t } = useTranslation();
	const host = import.meta.env.VITE_API_URL;

	type FormFields =
    | 'status'
    | 'nextStepDate'
    | 'comment';

	type FormValues = {
		status: string;
		nextStepDate: string;
		comment: string;
	}

	const validationRegister: {
		status: () => void;
		nextStepDate: () => void;
		comment: () => void;
	} = {
		status: () => validateStatus(),
		nextStepDate: () => validateNextStepDate(),
		comment: () => validateComment()
	};

	const [errors, setErrors] = useState<Record<FormFields, string | null>>({
		status: null,
		nextStepDate: null,
		comment: null
	});

	const [values, setValues] = useState<FormValues>({
		status: '',
		nextStepDate: '',
		comment: ''
	});

	useEffect(() => {
		if (selectedId) {
			fetch(`${host}/api/applications/applications-by-id?id=${selectedId}`)
				.then(response => response.json())
				.then(data => {
					setValues({
						status: data.status,
						nextStepDate: data.nextStepDate ?? '',
						comment: data.comment ?? ''
					});
				})
				.catch((error) => console.log(error));
		}		
	}, [selectedId]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		let value = e.currentTarget.value;
		let name = e.currentTarget.name;

		switch (name) {
			case 'status':
				//TODO:	
			//value = value.replace(/[^a-zA-ZÀ-ÿąĄćĆęĘłŁńŃóÓśŚżŻźŹ\s\-+.#()/]/g, '');
				break;
			case 'nextStepDate':
				//TODO:
				break;
			case 'comment':
				//TODO:
//				value = value.replace(/\D/g, '');
				break;
		}

		setValues(prev => ({...prev, [name]: value}));
	}

	function validate(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
		const currentValidation = validationRegister[e.currentTarget.name as Exclude<FormFields, 'company'>];
		if (currentValidation){
			currentValidation();
		}
	}

	/*
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

		if (isNaN(value) || value === 0) {
			setErrors(prev => ({...prev, salaryMin: null}));
			return;
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

		if (isNaN(value) || value === 0) {
			setErrors(prev => ({...prev, salaryMax: null}));
			return;
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
		setErrors(prev => ({...prev, currency: null}));
	}

	function validateCompany(company: Company | null) { 
		let value = company;
		if (!value) {
			setErrors(prev => ({...prev, company: t('formError.companyRequired')}));
			return
		}
		setErrors(prev => ({...prev, company: null}));
	}
	*/

	function validateStatus() {

	}

	function validateNextStepDate() {

	}

	function validateComment() {

	}

	function areRequiredFieldsFilled(): boolean {
		return false;
		//TODO:
		// if (
		// 	values.position.trim().length > 0 &&
		// 	values.company
		// ) { 
		// 	return true;
		// }
		// return false;
	}

	async	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		//TODO: userId shouldn't be 4, it's just for development
		const userId = 4;

		
		const updateApplicationRequestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({id: selectedId, ...values}),
		};
	
		try {
			//TODO:
			fetch(`${host}/api/application/offers-update?userId=${userId}`, updateApplicationRequestOptions)
				.then((response) => {
					if (!response.ok) throw new Error(`request failed with status ${response.status}`);

					onClose();
					onSubmit();
				})
				.catch((error) => console.log(JSON.stringify(error)));
		} catch (error) {
			console.error(error);
		}
		

	}


	//TODO: v - class names, form design etc
	return (
			<div className={styles.applicationForm}>
				<form onSubmit={handleSubmit}>
					<div className={styles.closeButton}><button type='button' onClick={onClose}>X</button></div>

					<div className={styles.applicationFormElement}>
						<label htmlFor='commentInput' className={styles.applicationFormLabel}>
							{t('comment')}
						</label>
						<div className={styles.inputWrapper}>
							<input className={styles.commentInput} id='commentInput' name='comment' type='text' onChange={handleChange} onBlur={validate} value={values.comment}/>
							{errors.comment ? <ErrorBox message={errors.comment} className={styles.errorBox} /> : ''}
						</div>
					</div>

					<div className={styles.applicationFormElement}>
						<label htmlFor='nextStepDateInput' className={styles.applicationFormLabel}>
							{t('nextStepDate')}
						</label>
						<div className={styles.inputWrapper}>
							<input className={styles.nextStepDateInput} id='nextStepDateInput' name='nextStepDate' type='date' onChange={handleChange} onBlur={validate} value={values.nextStepDate}/>
							{errors.nextStepDate ? <ErrorBox message={errors.nextStepDate} className={styles.errorBox} /> : ''}
						</div>
					</div>
					
					<div className={styles.applicationFormElement}>
						<label className={styles.applicationFormLabel}>
							{t('status')}
						</label>
						<div className={styles.selectWrapper}>
							<ChevronDownIcon className={styles.selectArrowIcon}/>
							<select name='status' id='status' onChange={handleChange} onBlur={validate} value={values.status}>
								<option value='unknown'>{t('unknown')}</option>
								{Object.values(ApplicationStatus).map((element) => 
									<option key={element} value={element}>{t(element)}</option>
								)}
							</select>
						</div>					
					</div>




				</form>
				<div className={styles.applicationFormSubmit}>
					<button type='submit' disabled={Object.values(errors).some((error) => error !== null) || !areRequiredFieldsFilled()}>{t('submitApplication')}</button>
				</div>
			</div>
	);
}