import styles from './CompanyCombobox.module.css'
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import type { Company } from '../../../../shared/models/models';

export default function CompanyCombobox() {
	const { t } = useTranslation();
	const [companies, setCompanies] = useState<Company[]>([]);
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
			})
			.catch((error) => console.log(error));
	}, [])

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
					/>
				</div>
				<div className={styles.newCompanyCheckbox}>
					<input id='newCompanyCheckbox' name='newCompanyCheckbox'  type='checkbox'/>
					<label htmlFor='newCompanyCheckbox' className={styles.newCompanyCheckboxLabel}>{t('noCompanyAddOne')}</label>
				</div>
			</div>

			<div className={styles.companyList}>
				{companies.map((element) => (
					<div className={styles.companyItem} key={element.id}>{element.name}</div>
				))}
			</div>

		</div>
	);
}