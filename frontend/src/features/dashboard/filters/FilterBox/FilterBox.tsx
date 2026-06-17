import type { DashboardMode } from '../../../../layouts/main-layout/AppNavigation/AppNavigation';
import ApplicationsFilters from '../../applications/ApplicationsFilters/ApplicationsFilters';
import JobOffersFilters from '../../job-offers/JobOffersFilters/JobOffersFilters';
import type { Filter, FilterName, JobOfferFilter } from '../../models/queryState';
import FilterPopover from '../shared/FilterPopover';
import styles from './FilterBox.module.css';
import { useState } from 'react';

type FilterBoxProps = {
	mode: DashboardMode;
	filters: Filter[];
	setFilter: (filter: Filter) => void; 
	onUnsetFilter: (filterName: FilterName) => void;
	
}

export default function FilterBox({mode, filters,  setFilter, onUnsetFilter}: FilterBoxProps){
	const [chosenFilter, setChosenFilter] = useState<FilterName>();
	
	function onSetFilter(filterName: FilterName){
		if (filters.find((element) => element.filterName === filterName)) {
			onUnsetFilter(filterName);
			setChosenFilter(undefined);
		} else {
			setChosenFilter(filterName);
		}
	}

	function handleSetFilter(filter: Filter){
		setChosenFilter(undefined);
		setFilter(filter);
	}

	return (
		<div className={styles.filterBox}>
			{mode === 'JobOffer' ? <JobOffersFilters filters={filters as JobOfferFilter[]} onSetFilter={onSetFilter}/> : <ApplicationsFilters/>}
			<FilterPopover mode={mode} filterName={chosenFilter} setFilter={handleSetFilter}/> 
		</div>
	);
}