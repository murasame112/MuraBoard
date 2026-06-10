import styles from './DashboardPager.module.css';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useState } from 'react';

type DashboardPagerType = {
	recordCount: number;
	currentPage: number;
	pageSize: number ;
	onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export default function DashboardPager({recordCount, currentPage, pageSize, onPageChange}: DashboardPagerType) {
	const { t } = useTranslation();
	const lastPage = Math.ceil(recordCount/pageSize);
	let start: number;
	const slots: number[] = [];
	const [goToPageValue, setGoToPageValue] = useState<number>();
	
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

	function handleChange(e: React.ChangeEvent<HTMLInputElement>){

	}

	return (
		<div className={styles.pagerWrapper}>
			<div className={styles.pager}>
				<div className={styles.pagesBox}>
					<ChevronDoubleLeftIcon className={`${styles.arrowButton} ${currentPage === 1 ? styles.arrowDisabled : styles.arrowActive}`}/>
					<ChevronLeftIcon className={`${styles.arrowButton} ${currentPage === 1 ? styles.arrowDisabled : styles.arrowActive}`}/>

					{slots.map((element) => (
						<div key={element} className={`${element === currentPage ? styles.pageActive : (element > lastPage ? styles.pageDisabled : '')} ${styles.page}`}>
							{element}
						</div>
					))}

					
					<ChevronRightIcon className={`${styles.arrowButton} ${currentPage === lastPage ? styles.arrowDisabled : styles.arrowActive}`}/>
					<ChevronDoubleRightIcon className={`${styles.arrowButton} ${currentPage === lastPage ? styles.arrowDisabled : styles.arrowActive}`}/>


				</div>
				<div className={styles.goToPageBox}>
					<label htmlFor='selectPage'>{t('goToPage')}:</label>
					<input id='selectPage' type='text' onChange={handleChange} />
					<button type='button' onClick={() => onPageChange(goToPageValue!)} disabled={goToPageValue ? false : true}>{t('go')}</button>
				</div>

			</div>
		</div>
	);
}