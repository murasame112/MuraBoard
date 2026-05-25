import styles from './CompanyCombobox.module.css'
import { useState, useEffect, use } from 'react';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import type { Company } from '../../../../shared/models/models';
import type { CompanyData } from '../DashboardJobOfferForm';

type CompanyComboboxProps = {
	labelClass: string;
	additionalFormTextClass: string;
	getCompany: (company: CompanyData) => void;
}

export default function CompanyCombobox({labelClass, additionalFormTextClass, getCompany}: CompanyComboboxProps) {
	const { t } = useTranslation();
	const [companies, setCompanies] = useState<Company[]>([]);
	const [limitedCompanies, setLimitedCompanies] = useState<Company[]>([]);
	const [searchBox, setSearchBox] = useState<string>('');
	const [addingCompany, setAddingCompany] = useState<boolean>(false);
	const [companyValues, setCompanyValues] = useState<CompanyData | null>(null);
	const host = import.meta.env.VITE_API_URL;

	//name value = value.replace(/[^a-zA-ZÀ-ÿąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\s\-&.]/g, '');
	// location value = value.replace(/[^a-zA-ZÀ-ÿąĄćĆęĘłŁńŃóÓśŚżŻźŹ\s\-.,/'’]/g, '');
	// website value = value.replace(/\s/g, '');
	
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
	}

	function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const val = e.currentTarget.value;
		setSearchBox(val);
		setLimitedCompanies((prev) => {
			return companies.filter((element: Company) => element.name.toLowerCase().startsWith(val.toLowerCase()));
		});
	}

	function handleChangeCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
		setAddingCompany((prev) => !prev);
	}

	function chooseCompany(company: CompanyData) {
		getCompany(company);
		setCompanyValues(company);
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
						<input type='text' name='companyName' id='companyName'/>
						<label className={labelClass} htmlFor='companyLocation'>{t('location')}</label>
						<input type='text' name='companyLocation' id='companyLocation'/>
						<label className={labelClass} htmlFor='companyWebsite'>{t('website')}</label>
						<p className={additionalFormTextClass}>{t('canBeLeftEmpty')}</p>
						<input type='text' name='companyWebsite' id='companyWebsite'/>

						<button type='button' className={styles.comboboxSubmit}>{t('addCompany')}</button>
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