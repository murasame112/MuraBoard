import styles from './DashboardPager.module.css';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useState } from 'react';

type DashboardPagerType = {
	recordCount: number;
	currentPage: number;
	pageSize: number ;
	onPageChange: React.Dispatch<React.SetStateAction<number>>;
	refreshToken: number;
}

export default function DashboardPager({recordCount, currentPage, pageSize, onPageChange, refreshToken}: DashboardPagerType) {
	const { t } = useTranslation();
	const lastPage = Math.ceil(recordCount/pageSize);
	let start: number;
	const slots: number[] = [];
	const [goToPageValue, setGoToPageValue] = useState<string>('');
	
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
		let value = e.currentTarget.value;
		value = value.replace(/\D/g, '');
		console.log(value);
		setGoToPageValue(value);
		
	}

	function handleGoToPage(){
		let page = Number(goToPageValue)
		if (page < 1) {
			page = 1;
		} else if (page > lastPage) {
			page = lastPage;
		}
		if(!isNaN(page)) onPageChange(page);
	}

	type ArrowTypes = 'first' | 'last' | 'prev' | 'next';
	function handlePageArrowChange(arrow: ArrowTypes){
		switch(arrow){
			case 'first':
				if (currentPage === 1) break;
				onPageChange(1);
				break;
			case 'prev':
				if (currentPage === 1) break;
				onPageChange(currentPage - 1);
				break;
			case 'next':
				if (currentPage === lastPage) break;
				onPageChange(currentPage + 1);
				break;
			case 'last':
				if (currentPage === lastPage) break;
				onPageChange(lastPage);
				break;
		}
	}

	function handlePageChange(page: number){
		if( page > lastPage || page === currentPage) return;
		onPageChange(page);
	}

	return (
        <div className={styles.pagerWrapper}>
            <div className={styles.pager}>
                <div className={styles.pagesBox}>
                    <ChevronDoubleLeftIcon
                        className={`${styles.arrowButton} ${currentPage === 1 ? styles.arrowDisabled : styles.arrowActive}`}
                        onClick={() => handlePageArrowChange('first')}
                    />
                    <ChevronLeftIcon
                        className={`${styles.arrowButton} ${currentPage === 1 ? styles.arrowDisabled : styles.arrowActive}`}
                        onClick={() => handlePageArrowChange('prev')}
                    />

                    {slots.map((element, index) => (
                        <div
                            key={element}
                            className={`${element === currentPage ? styles.pageActive : element > lastPage ? styles.pageDisabled : ''} ${styles.page}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {element}
                        </div>
                    ))}

                    <ChevronRightIcon
                        className={`${styles.arrowButton} ${currentPage === lastPage ? styles.arrowDisabled : styles.arrowActive}`}
                        onClick={() => handlePageArrowChange('next')}
                    />
                    <ChevronDoubleRightIcon
                        className={`${styles.arrowButton} ${currentPage === lastPage ? styles.arrowDisabled : styles.arrowActive}`}
                        onClick={() => handlePageArrowChange('last')}
                    />
                </div>
                <div className={styles.goToPageBox}>
                    <label htmlFor='selectPage'>{t('goToPage')}:</label>
                    <input
                        id='selectPage'
                        type='text'
                        value={goToPageValue}
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        onClick={handleGoToPage}
                        disabled={
                            typeof goToPageValue === 'string' ? false : true
                        }
                    >
                        {t('go')}
                    </button>
                </div>
            </div>
        </div>
    );
}