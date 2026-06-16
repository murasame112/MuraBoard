import type { ApplicationsFilterNames, Filter, JobOffersFilterNames } from '../../models/queryState';
import styles from './FilterPopover.module.css';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../../shared/i18n/useTranslation';

type FilterPopoverProps = {
	filterName?: JobOffersFilterNames | ApplicationsFilterNames;
	setFilter: (filter: Filter) => void; 
}

export default function FilterPopover({filterName, setFilter}: FilterPopoverProps){
	const { t } = useTranslation();
	const [popoverValue, setPopoverValue] = useState<string | number>('');
	const [isPopoverDisabled, setIsPopoverDisabled] = useState<boolean>(true);
	const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

	useEffect(() => {
		if (!filterName) {
			setPopoverValue('');
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
		if (filterName && popoverValue !== '') {
			setFilter({filterName, value: popoverValue});
			setPopoverValue('');
			setIsPopoverDisabled(true);
			setIsSubmitDisabled(true);
		}
	}

	return (
        <div className={styles.filterPopover}>
            {filterName === 'status' ? 
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