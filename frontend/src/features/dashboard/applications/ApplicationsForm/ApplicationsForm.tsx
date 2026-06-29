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
			fetch(`${host}/api/application/applications-by-id?id=${selectedId}`)
				.then(response => response.json())
				.then(data => {
					setValues({
						status: data.status,
						nextStepDate: data.nextStepDate ? data.nextStepDate.slice(0, 10) : '',
						comment: data.comment ?? ''
					});
				})
				.catch((error) => console.log(error));
		}		
	}, [selectedId]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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

	function validate(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		const currentValidation = validationRegister[e.currentTarget.name as Exclude<FormFields, 'company'>];
		if (currentValidation){
			currentValidation();
		}
	}

	function validateStatus() {
		let value = values.status;

		if (!Object.values(ApplicationStatus).includes(value as ApplicationStatus)) {
			setErrors(prev => ({...prev, status: t('formError.wrongStatus')}));
			return;
		}

		setErrors(prev => ({...prev, status: null}));
	}

	function validateNextStepDate() {
		let value = new Date(values.nextStepDate);

		if (values.nextStepDate && Number.isNaN(value.getTime())) {
			setErrors(prev => ({...prev, nextStepDate: t('formError.wrongNextStepDate')}));
			return
		}

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (value < today) {
			setErrors(prev => ({...prev, nextStepDate: t('formError.dateInThePast')}));
			return;
		}

		setErrors(prev => ({...prev, nextStepDate: null}));
	}

	function validateComment() {
		let value = values.comment.trim();

		if (value.length > 500){
			setErrors(prev => ({...prev, comment: t('formError.positionTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, comment: null}));
	}

	function areRequiredFieldsFilled(): boolean {
		if (
			values.status
		) { 
			return true;
		}
		return false;
	}

	async	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		//TODO: userId shouldn't be 4, it's just for development
		const userId = 4;
		console.log('happens');

		
		const updateApplicationRequestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({id: selectedId, ...values}),
		};
	
		try {
			//TODO:
			fetch(`${host}/api/application/applications-update?userId=${userId}`, updateApplicationRequestOptions)
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
					<div className={styles.formContent}>
						<div className={styles.closeButton}><button type='button' onClick={onClose}>X</button></div>

						<div className={styles.applicationFormElement}>
							<label htmlFor='commentInput' className={styles.applicationFormLabel}>
								{t('comment')}
							</label>
							<div className={styles.inputWrapper}>
								<textarea className={styles.commentInput} id='commentInput' name='comment' onChange={handleChange} onBlur={validate} value={values.comment}/>
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
									{Object.values(ApplicationStatus).map((element) => 
										<option key={element} value={element}>{t(element)}</option>
									)}
								</select>
							</div>					
						</div>
					</div>
					



					<div className={styles.applicationFormSubmit}>
						<button type='submit' disabled={Object.values(errors).some((error) => error !== null) || !areRequiredFieldsFilled()}>{t('submitApplication')}</button>
					</div>
				</form>
				
			</div>
	);
}