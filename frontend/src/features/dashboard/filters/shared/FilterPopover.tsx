import type { ApplicationsFilterNames, Filter, JobOffersFilterNames } from '../../models/queryState';
import styles from './FilterPopover.module.css';
import { useState } from 'react';

type FilterPopoverProps = {
	filterName?: JobOffersFilterNames | ApplicationsFilterNames;
	setFilter: (filter: Filter) => void; 
}

export default function FilterPopover({filterName, setFilter}: FilterPopoverProps){
	const [popoverValue, setPopoverValue] = useState<string | number>('');

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setPopoverValue(e.currentTarget.value);
	}

	function submitFilter() {
		if (filterName) {
			setFilter({filterName, value: popoverValue});
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
                    disabled={!filterName}
                />
            )}
						<button type='button' onClick={submitFilter}>set</button>
        </div>
    );
}