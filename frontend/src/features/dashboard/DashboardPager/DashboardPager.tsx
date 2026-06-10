import styles from './DashboardPager.module.css';
import { useState, useEffect } from 'react';

type DashboardPagerType = {
	recordCount: number;
	currentPage: number;
	pageSize: number ;
	onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export default function DashboardPager({recordCount, currentPage, pageSize, onPageChange}: DashboardPagerType) {
	const lastPage = Math.ceil(recordCount/pageSize);
	let start: number;
	const slots: number[] = [];
	
	if (lastPage <= 5){ 
		start = 1;
	} else {
		if (currentPage <= 3) {
			start = 1;
		} else if (currentPage >= lastPage - 2) {
			start = lastPage - 4;
		} else {
			start = currentPage - 2;
		}
	}

	for(let i = 0; i < 5; i++){
		slots.push(start + i);
	}

	return (
		<div className={styles.pager}>
			{slots.map((element) => (
				<div key={element} className={element === currentPage ? styles.pageActive : (element > lastPage ? styles.pageDisabled : styles.page)}>{element}</div>
			))}
		</div>
	);
}