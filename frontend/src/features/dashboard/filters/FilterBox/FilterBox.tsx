import type { DashboardMode } from '../../../../layouts/main-layout/AppNavigation/AppNavigation';
import ApplicationsFilters from '../../applications/ApplicationsFilters/ApplicationsFilters';
import JobOffersFilters from '../../job-offers/JobOffersFilters/JobOffersFilters';
import type { Filter, JobOfferFilter } from '../../models/queryState';
import FilterPopover from '../shared/FilterPopover';
import styles from './FilterBox.module.css';

type FilterBoxProps = {
	mode: DashboardMode;
	filters: Filter[];
}

export default function FilterBox({mode, filters}: FilterBoxProps){
	

	// on set fiter from child:
	//		check if active - if yes, unset, else send to FilterPopover

	return (
		<div className={styles.filterBox}>
			{mode === 'JobOffer' ? <JobOffersFilters filters={filters as JobOfferFilter[]}/> : <ApplicationsFilters/>}
			<FilterPopover/> 
			{/* ^ gets filter type */}
		</div>
	);
}