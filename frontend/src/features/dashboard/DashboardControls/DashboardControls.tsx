import styles from './DashboardControls.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { DashboardFormType } from '../DashboardFormWrapper/DashboardFormWrapper';
import { useState, useEffect } from 'react';
import type { ApplicationsFilterNames, Filter, JobOffersFilterNames } from '../models/queryState';
import FilterBox from '../filters/FilterBox/FilterBox';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';

type DashboardControlsProps = {
	className: string;
	mode: DashboardMode;
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	toggleFilterBox: () => void;
	filters: Filter[];
	isFilterBoxDisplayed: boolean;
	onUnsetFilter: (filterName: JobOffersFilterNames | ApplicationsFilterNames) => void;
	onSearch: (searchPhrase: string) => void;
}

export default function DashboardControls({className, mode, callForm, toggleFilterBox, filters, isFilterBoxDisplayed, onUnsetFilter, onSearch}: DashboardControlsProps) {
	const { t } = useTranslation();
	const [searchPhrase, setSearchPhrase] = useState<string>('');

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
		setSearchPhrase(e.currentTarget.value);
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onSearch(searchPhrase.trim());
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		}
	}, [searchPhrase]);

	return(
		<div className={`${className}`}>
			<div className={styles.searchWrapper}>
				<MagnifyingGlassIcon className={styles.searchIcon} />
				<input
					className={styles.searchBar}
					value={searchPhrase}
					onChange={handleSearch}
					placeholder={t('search')}
				/>
			</div>
			<div className={`${styles.filteringContent}`}>
				<button type='button' className={`${styles.filterButton} ${isFilterBoxDisplayed ? styles.filterButtonActive : ''}`} onClick={toggleFilterBox}><FunnelIcon className={styles.filterIcon}/>
				{t('addFilter')}
				</button>
			{isFilterBoxDisplayed ? <FilterBox mode={mode} filters={filters} onUnsetFilter={onUnsetFilter}/> : ''}
			</div>
			
			
			
			<button type='button' className={styles.addButton} onClick={() => callForm('add')}><PlusIcon className={styles.plusIcon}/>{t('add')} {t(mode)}</button>
		</div>
	);
}