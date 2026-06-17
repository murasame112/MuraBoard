import type { Filter, FilterName } from '../../models/queryState';
import styles from './FilterPopover.module.css';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../../shared/i18n/useTranslation';
import type { DashboardMode } from '../../../../layouts/main-layout/AppNavigation/AppNavigation';

type FilterPopoverProps = {
	mode: DashboardMode;
	filterName?: FilterName;
	setFilter: (filter: Filter) => void; 
}

export default function FilterPopover({mode, filterName, setFilter}: FilterPopoverProps){
	const { t } = useTranslation();
	const [popoverValue, setPopoverValue] = useState<string | number>('');
	const [isPopoverDisabled, setIsPopoverDisabled] = useState<boolean>(true);
	const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

	useEffect(() => {
		setPopoverValue('');
		setIsSubmitDisabled(true);
		if (!filterName) {
			setIsPopoverDisabled(true);
		} else {
			setIsPopoverDisabled(false);
		}
	}, [filterName]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setPopoverValue(e.currentTarget.value);
		if (e.currentTarget.value !== '') {
			setIsSubmitDisabled(false);
		} else {
			setIsSubmitDisabled(true);
		}
	}

	function submitFilter() {
		if (!filterName || popoverValue === '') return;

		if (filterName === 'position' || filterName === 'companyName') {

			setFilter({
				filterName,
				value: String(popoverValue).trim(),
			});

		} else if (filterName === 'salaryMin' || filterName === 'salaryMax') {

			const numericValue = Number(popoverValue);
			if (Number.isNaN(numericValue)) return;

			setFilter({
				filterName,
				value: numericValue,
			});

		} else if (filterName === 'jobOfferStatus') {

			setFilter({
				filterName,
				value: popoverValue as 'applied' | 'notApplied',
			});

		} else if (filterName === 'applicationStatus') {

			setFilter({
				filterName,
				value: popoverValue as 'applied' | 'rejected',
			});

		}

		setPopoverValue('');
		setIsPopoverDisabled(true);
		setIsSubmitDisabled(true);
	}
	return (
        <div className={styles.filterPopover}>
            {filterName === 'jobOfferStatus' ? 
						(
                <select onChange={handleChange} disabled={isPopoverDisabled}>
									<option value=''></option>
									<option value='applied'>{t('applied')}</option>
									<option value='notApplied'>{t('notApplied')}</option>
								</select>
            ) : (
                <input
                    type='text'
                    onChange={handleChange}
                    value={popoverValue}
                    disabled={isPopoverDisabled}
                />
            )}
						<button type='button' onClick={submitFilter} disabled={isSubmitDisabled}>set</button>
        </div>
    );
}