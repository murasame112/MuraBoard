import type { ApplicationsFilterNames, JobOffersFilterNames } from '../../models/queryState';
import styles from './FilterPopover.module.css';

type FilterPopoverProps = {
	filterName?: JobOffersFilterNames | ApplicationsFilterNames;
}

export default function FilterPopover({filterName}: FilterPopoverProps){
	return (
		<>{filterName}</>
	);
}