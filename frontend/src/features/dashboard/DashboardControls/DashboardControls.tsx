import styles from './DashboardControls.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { DashboardFormType } from '../DashboardFormWrapper/DashboardFormWrapper';
import { useState, useEffect } from 'react';
import type { Filter, FilterName } from '../models/queryState';
import FilterBox from '../filters/FilterBox/FilterBox';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import FilterPanel from '../filters/FilterPanel/FilterPanel';

type DashboardControlsProps = {
	className: string;
	mode: DashboardMode;
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	filters: Filter[];
	setFilter: (filter: Filter) => void; 
	onUnsetFilter: (filterName: FilterName) => void;
	onClearAllFilters: () => void;
	onSearch: (searchPhrase: string) => void;
}

export default function DashboardControls({className, mode, callForm, filters, setFilter, onUnsetFilter, onClearAllFilters, onSearch}: DashboardControlsProps) {
	const { t } = useTranslation();
	const [searchPhrase, setSearchPhrase] = useState<string>('');
	const [isFilterBoxDisplayed, setIsFilterBoxDisplayed] = useState<boolean>(false);
	const [isFilterPanelDisplayed, setIsFilterPanelDisplayed] = useState<boolean>(false);

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
		setSearchPhrase(e.currentTarget.value);
	}

	function toggleFilterBox(){
		setIsFilterBoxDisplayed(prev => !prev);
	}

	function toggleFilterPanel(){
		setIsFilterPanelDisplayed(prev => !prev);
	}


	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onSearch(searchPhrase.trim());
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		}
	}, [searchPhrase]);

	useEffect(() => {
		if (filters.length === 0) {
			setIsFilterPanelDisplayed(false);
		}
	}, [filters]);

	return(
		<div className={`${className}`}>

			{filters.length > 0 ? 
				<div className={styles.activeFiltersWrapper}>
					<button type='button' className={styles.activeFilters} onClick={toggleFilterPanel}>{t('activeFilters')}: {filters.length}</button>
					{isFilterPanelDisplayed ? <FilterPanel filters={filters} onUnsetFilter={onUnsetFilter} onClearAllFilters={onClearAllFilters}/> : ''}
				</div>
			: ''}

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
			{isFilterBoxDisplayed ? <FilterBox mode={mode} filters={filters} setFilter={setFilter} onUnsetFilter={onUnsetFilter}/> : ''}
			</div>
			
			
			
			<button type='button' className={styles.addButton} onClick={() => callForm('add')}><PlusIcon className={styles.plusIcon}/>{t('add')} {t(mode)}</button>
		</div>
	);
}