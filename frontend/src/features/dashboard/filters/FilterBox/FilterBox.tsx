import type { DashboardMode } from '../../../../layouts/main-layout/AppNavigation/AppNavigation';
import FilterPopover from '../shared/FilterPopover';
import styles from './FilterBox.module.css';
import { useState } from 'react';

type FilterBoxProps = {
	mode: DashboardMode;
}

export default function FilterBox({mode}: FilterBoxProps){
	const []

	return (
		<div className={styles.filterBox}>
			<>job offer/application filters</>
			<FilterPopover/> 
			{/* ^ gets filter type */}
		</div>
	);
}