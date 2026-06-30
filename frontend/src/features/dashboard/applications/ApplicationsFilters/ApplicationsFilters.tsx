import styles from './ApplicationsFilters.module.css';
import type { FilterName, ApplicationFilter} from '../../models/queryState';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { useState, useEffect } from 'react';

type ApplicationFilterProps = {
		filters: ApplicationFilter[];
		onSetFilter: (filterName: FilterName) => void;
};


export default function ApplicationsFilters({ filters, onSetFilter }: ApplicationFilterProps){
	const { t } = useTranslation();
	const [selected, setSelected] = useState<FilterName>();

	useEffect(() => {
		setSelected(undefined);
	}, [filters]);

	function selectFilter(filterName: FilterName, isActive: boolean) {
		onSetFilter(filterName);
		if (!isActive) {
			setSelected(filterName);
		} else {
			setSelected(undefined);
		}
		
	}

	const availableFilters: ApplicationFilter[] = [
			{ filterName: 'position' },
			{ filterName: 'companyName' },
			{ filterName: 'applicationStatus' },
			{ filterName: 'applicationDateFrom' },
			{ filterName: 'applicationDateTo' },
	];


	return (
		<div className={styles.applicationsFilters}>
			{availableFilters.map((element) => {
				let isActive: boolean = filters.find((e) => e.filterName === element.filterName)?.value ? true : false;
				return (
					<div
							key={element.filterName}
							className={`${styles.filterItem} ${isActive ? styles.filterItemActive :
								selected === element.filterName ? styles.filterItemSelected : ''}`}
							onClick={() => selectFilter(element.filterName, isActive)}
					>
							<input type='checkbox' checked={isActive} readOnly/>
							<p>{t(`filter.${element.filterName}`)}</p>
					</div>
			)})}
		</div>
	);
}