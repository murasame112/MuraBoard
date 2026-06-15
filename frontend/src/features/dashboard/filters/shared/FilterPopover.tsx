import type { ApplicationsFilterNames, Filter, JobOffersFilterNames } from '../../models/queryState';
import styles from './FilterPopover.module.css';
import { useState, useEffect } from 'react';

type FilterPopoverProps = {
	filterName?: JobOffersFilterNames | ApplicationsFilterNames;
	setFilter: (filter: Filter) => void; 
}

export default function FilterPopover({filterName, setFilter}: FilterPopoverProps){
	const [popoverValue, setPopoverValue] = useState<string | number>('');
	const [isPopoverDisabled, setIsPopoverDisabled] = useState<boolean>(true);

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
	}

	function submitFilter() {
		if (filterName) {
			setFilter({filterName, value: popoverValue});
			setPopoverValue('');
			setIsPopoverDisabled(true);
		}
	}

	return (
        <div className={styles.filterPopover}>
            {filterName === 'status' ? (
                <select></select>
            ) : (
                <input
                    type='text'
                    onChange={handleChange}
                    value={popoverValue}
                    disabled={isPopoverDisabled}
                />
            )}
						<button type='button' onClick={submitFilter} disabled={isPopoverDisabled}>set</button>
        </div>
    );
}