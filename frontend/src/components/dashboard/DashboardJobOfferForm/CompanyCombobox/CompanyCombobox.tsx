import styles from './CompanyCombobox.module.css'
import { useState, useEffect, use } from 'react';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import type { Company } from '../../../../shared/models/models';

export default function CompanyCombobox() {
	const { t } = useTranslation();
	const [companies, setCompanies] = useState<Company[]>([]);
	const [limitedCompanies, setLimitedCompanies] = useState<Company[]>([]);
	const [searchBox, setSearchBox] = useState<string>('');
	const host = import.meta.env.VITE_API_URL;
	
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
	}, [])

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const val = e.currentTarget.value;
		setSearchBox(val);
		setLimitedCompanies((prev) => {
			return companies.filter((element: Company) => element.name.startsWith(val))
		});
	}

	return (
		<div className={styles.comboboxContent}>
			{/*input ktory wyswietla pod spodem pop up z firmami
			sam input robi za searchbar i na biezaco ogranicza liste*/}
			<div className={styles.comboboxInputs}>
				<div className={styles.comboboxSearchWrapper}>
					<MagnifyingGlassIcon className={styles.comboboxSearchIcon} />
					<input
						className={styles.comboboxSearchBar}
						placeholder={t('findACompany') + '...'}
						onChange={handleChange}
						value={searchBox}
					/>
				</div>
				<div className={styles.newCompanyCheckbox}>
					<input id='newCompanyCheckbox' name='newCompanyCheckbox'  type='checkbox'/>
					<label htmlFor='newCompanyCheckbox' className={styles.newCompanyCheckboxLabel}>{t('noCompanyAddOne')}</label>
				</div>
			</div>

			<div className={styles.companyList}>
				{limitedCompanies.map((element) => (
					<div className={styles.companyItem} key={element.id}>{element.name}</div>
				))}
			</div>

		</div>
	);
}