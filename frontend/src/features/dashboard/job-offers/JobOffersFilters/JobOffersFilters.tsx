import styles from './JobOffersFilters.module.css';
import type { JobOfferFilter, JobOffersFilterNames } from '../../models/queryState';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { useState } from 'react';

type JobOfferFilterProps = {
    filters: JobOfferFilter[];
    onSetFilter: (filterName: JobOffersFilterNames) => void;
};

export default function JobOffersFilters({ filters, onSetFilter }: JobOfferFilterProps) {
    const { t } = useTranslation();
		const [selected, setSelected] = useState<JobOffersFilterNames>();

		function selectFilter(filterName: JobOffersFilterNames, isActive: boolean) {
			
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
        { filterName: 'status' },
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
										<input type='checkbox' checked={isActive}/>
                    <p>{t(`filter.${element.filterName}`)}</p>
                </div>
            )})}
        </div>
    );
}
