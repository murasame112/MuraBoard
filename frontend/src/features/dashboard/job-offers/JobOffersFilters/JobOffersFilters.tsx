import styles from './JobOffersFilters.module.css';
import type { FilterName, JobOfferFilter} from '../../models/queryState';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { useState, useEffect } from 'react';

type JobOfferFilterProps = {
    filters: JobOfferFilter[];
    onSetFilter: (filterName: FilterName) => void;
};

export default function JobOffersFilters({ filters, onSetFilter }: JobOfferFilterProps) {
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

    const availableFilters: JobOfferFilter[] = [
        { filterName: 'position' },
        { filterName: 'companyName' },
        { filterName: 'jobOfferStatus' },
        { filterName: 'salaryMin' },
        { filterName: 'salaryMax' },
    ];

    return (
        <div className={styles.jobOffersFilters}>
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
