import styles from './CompanyCombobox.module.css'
import { useState, useEffect, use } from 'react';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import ErrorBox from '../ErrorBox/ErrorBox';
import type { Company } from '../../../../shared/models/models';
import type { CompanyData } from '../DashboardJobOfferForm';

type CompanyComboboxProps = {
	labelClass: string;
	additionalFormTextClass: string;
	getCompany: (company: CompanyData | null) => void;
}

export default function CompanyCombobox({labelClass, additionalFormTextClass, getCompany}: CompanyComboboxProps) {
	const { t } = useTranslation();
	const [companies, setCompanies] = useState<Company[]>([]);
	const [limitedCompanies, setLimitedCompanies] = useState<Company[]>([]);
	const [searchBox, setSearchBox] = useState<string>('');
	const [addingCompany, setAddingCompany] = useState<boolean>(false);
	const emptyNewCompany = {id: null, name: '', location: '', website: null};
	const [newCompanyValues, setNewCompanyValues] = useState<CompanyData>(emptyNewCompany);
	const [companyValues, setCompanyValues] = useState<CompanyData | null>(null);
	const host = import.meta.env.VITE_API_URL;

	type FormFields =
	| 'name'
	| 'location'
	| 'website';

	const validationRegister: Record<FormFields, () => void> = {
		name: () => validateName(),
		location: () => validateLocation(),
		website: () => validateWebsite()
	}

	const [errors, setErrors] = useState<Record<FormFields, string | null>>({
		name: null,
		location: null,
		website: null,
	});

	function validate(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
		const currentValidation = validationRegister[e.currentTarget.name as FormFields];
		if (currentValidation){
			currentValidation();
		}
	}

	function validateName() {
		let value = newCompanyValues.name.trim();

		if (value.length === 0) {
			setErrors(prev => ({...prev, name: t('formError.companyNameRequired')}));
			return;
		}

		if (value.length < 5) {
			setErrors(prev => ({...prev, name: t('formError.companyNameTooShort')}));
			return;
		}

		if (value.length > 80){
			setErrors(prev => ({...prev, name: t('formError.companyNameTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, name: null}));
	}

	function validateLocation() {
		let value = newCompanyValues.location.trim();

		if (value.length === 0) {
			setErrors(prev => ({...prev, location: t('formError.companyLocationRequired')}));
			return;
		}

		if (value.length < 3) {
			setErrors(prev => ({...prev, location: t('formError.companyLocationTooShort')}));
			return;
		}

		if (value.length > 254){
			setErrors(prev => ({...prev, location: t('formError.companyLocationTooLong')}));
			return;
		}

		setErrors(prev => ({...prev, location: null}));
	}

	function validateWebsite() {
		if(!newCompanyValues.website) {
			setErrors(prev => ({...prev, website: null}));
			return;
		}

		let value = 'https://' + newCompanyValues.website.trim();

		if (value.length < 13) {
			setErrors(prev => ({...prev, website: t('formError.companyWebsiteTooShort')}));
			return;
		}

		if (value.length > 269){
			setErrors(prev => ({...prev, website: t('formError.companyWebsiteTooLong')}));
			return;
		}

		try {
			const url = new URL(value);
			if (url.protocol !== 'https:') {
				setErrors(prev => ({ ...prev, website: t('formError.companyWebsiteInvalid') }));
				return;
			}
			
			if (!url.hostname.includes('.')) {
				setErrors(prev => ({
					...prev,
					website: t('formError.companyWebsiteInvalid')
				}));
				return;
			}

			setErrors(prev => ({...prev, website: null}));

		} catch {
			setErrors(prev => ({ ...prev, website: t('formError.companyWebsiteInvalid') }));
			return;
		}
	}
	
	useEffect(() => {
		fetch(`${host}/api/joboffer/companies`)
			.then((response) => response.json())
			.then((data) => {
				if (data.length === 0|| !data) {
					setCompanies([]);
					return;
				}
				const sortedData = 	data.sort(function(a: Company, b: Company) {
					return a.name.localeCompare(b.name);
				});
				setCompanies(sortedData);
				setLimitedCompanies(sortedData);
			})
			.catch((error) => console.log(error));
	}, []);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		let value = e.currentTarget.value;
		let name = e.currentTarget.name;

		switch (name) {
			case 'name':
				value = value.replace(/[^a-zA-ZÀ-ÿąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\s\-&.]/g, '');
				break;
			case 'location':
				value = value.replace(/[^a-zA-ZÀ-ÿąĄćĆęĘłŁńŃóÓśŚżŻźŹ\s\-.,/'’]/g, '');
				break;
			case 'website':
				value = value.replace(/\s/g, '');
				break;
		}

		setNewCompanyValues(prev => ({...prev, [name]: value}));
	}

	function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const val = e.currentTarget.value;
		setSearchBox(val);
		setLimitedCompanies(() => {
			return companies.filter((element: Company) => element.name.toLowerCase().startsWith(val.toLowerCase()));
		});
	}

	function handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
		setAddingCompany((prev) => !prev);
		setNewCompanyValues(emptyNewCompany);
		setCompanyValues(null);
		getCompany(null);
	}

	function chooseCompany(company: CompanyData) {
		getCompany(company);
		setCompanyValues(company);
	}

	function areRequiredFieldsFilled(): boolean {
		if (
			newCompanyValues.name.trim().length > 0 &&
			newCompanyValues.location.trim().length > 0
		) { 
			console.log('true');
			return true;
		}
		console.log('false');
		return false;
	}

	function handleAddingCompany() {
		const addCompanyRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompanyValues),
    };
		
	}

	return (
		<div className={styles.comboboxContent}>
			<div className={styles.comboboxInputs}>
				<div className={styles.comboboxSearchWrapper}>
					<MagnifyingGlassIcon className={addingCompany ? `${styles.comboboxSearchIconDisabled} ${styles.comboboxSearchIcon} ` : styles.comboboxSearchIcon} />
					<input
						className={styles.comboboxSearchBar}
						placeholder={t('findACompany') + '...'}
						onChange={handleChangeSearch}
						value={searchBox}
						disabled={addingCompany}
					/>
				</div>
				<div className={styles.newCompanyCheckbox}>
					<input id='newCompanyCheckbox' name='newCompanyCheckbox' type='checkbox' onChange={handleChangeCheckbox} checked={addingCompany}/>
					<label htmlFor='newCompanyCheckbox' className={styles.newCompanyCheckboxLabel}>{t('noCompanyAddOne')}</label>
				</div>
			</div>

			<div className={styles.comboboxDisplayWrapper}>
				{addingCompany ? 
					<div className={styles.newCompanyInputs}>
						<label className={labelClass} htmlFor='companyName'>{t('name')}</label>
						<div className={styles.inputWrapper}>
							<input type='text' name='name' id='companyName' value={newCompanyValues?.name ?? ''} onChange={handleChange} onBlur={validate}/>
							{errors.name ? <ErrorBox message={errors.name} /> : ''}
						</div>
						<label className={labelClass} htmlFor='companyLocation'>{t('location')}</label>
						<div className={styles.inputWrapper}>
							<input type='text' name='location' id='companyLocation' value={newCompanyValues?.location ?? ''} onChange={handleChange} onBlur={validate}/>
							{errors.location ? <ErrorBox message={errors.location} /> : ''}
						</div>
						<label className={labelClass} htmlFor='companyWebsite'>{t('website')}</label>
						<div className={styles.inputWrapper}>
							<p className={additionalFormTextClass}>{`${t('canBeLeftEmpty')}, ${t('withoutHttps')}`}</p>
							<input type='text' name='website' id='companyWebsite' value={newCompanyValues?.website ?? ''} onChange={handleChange} onBlur={validate}/>
							{errors.website ? <ErrorBox message={errors.website} /> : ''}
						</div>

						<button disabled={Object.values(errors).some((error) => error !== null) || !areRequiredFieldsFilled()} type='button' onClick={handleAddingCompany} className={styles.comboboxSubmit}>{t('addCompany')}</button>
					</div> 
				: 
					<div className={styles.companyList}>
						{companies.length === 0 ? 
							<div className={styles.companyNoItem} onClick={() => setAddingCompany(true)}>{t('companyListEmpty')}</div>
							: limitedCompanies.map((element) => (
							<div className={styles.companyItem} key={element.id} onClick={() => chooseCompany({id: element.id, name: element.name, location: element.location, website: element.website ?? null})}>{element.name}</div>
						))}
					</div>
				}

			{companyValues ? 
				<div className={styles.chosenCompany}>
					<p className={styles.chosenCompanyName}>{companyValues.name}</p>
					<p className={styles.chosenCompanyLocation}>{companyValues.location}</p>
					{companyValues.website ? <a href={companyValues.website} className={styles.chosenCompanyWebsite}>{companyValues.website}</a> : <p className={styles.chosenCompanyNoWebsite}>{t('noWebsiteProvided')}</p>}
				</div> 
			: ''}

			</div>
		</div>
	);
}