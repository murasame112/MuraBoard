import type { DashboardMode } from '../../../../layouts/main-layout/AppNavigation/AppNavigation';
import ApplicationsFilters from '../../applications/ApplicationsFilters/ApplicationsFilters';
import JobOffersFilters from '../../job-offers/JobOffersFilters/JobOffersFilters';
import type { ApplicationsFilterNames, Filter, JobOfferFilter, JobOffersFilterNames } from '../../models/queryState';
import FilterPopover from '../shared/FilterPopover';
import styles from './FilterBox.module.css';
import { useState } from 'react';

type FilterBoxProps = {
	mode: DashboardMode;
	filters: Filter[];
	onUnsetFilter: (filterName: JobOffersFilterNames | ApplicationsFilterNames) => void;
}

export default function FilterBox({mode, filters, onUnsetFilter}: FilterBoxProps){
	const [chosenFilter, setChosenFilter] = useState<JobOffersFilterNames | ApplicationsFilterNames>();
	
	function onSetFilter(filterName: JobOffersFilterNames | ApplicationsFilterNames){
		if (filters.find((element) => element.filterName === filterName)?.value) {
			onUnsetFilter(filterName);
		} else {
			setChosenFilter(filterName);
		}
	}

	return (
		<div className={styles.filterBox}>
			{mode === 'JobOffer' ? <JobOffersFilters filters={filters as JobOfferFilter[]} onSetFilter={onSetFilter}/> : <ApplicationsFilters/>}
			<FilterPopover filterName={chosenFilter}/> 
			{/* ^ gets filter type */}
		</div>
	);
}