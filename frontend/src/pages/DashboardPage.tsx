import styles from './DashboardPage.module.css';
import { useTranslation } from '../shared/i18n/useTranslation';
import type { DashboardMode } from '../layouts/main-layout/AppNavigation/AppNavigation';
import type { DashboardFormType } from '../features/dashboard/DashboardFormWrapper/DashboardFormWrapper';
import type { ApplicationsFilterNames, Filter, JobOffersFilterNames, QueryState } from '../features/dashboard/models/queryState';
import { useState, useEffect } from 'react';
import DashboardStats from '../features/dashboard/DashboardStats/DashboardStats';
import DashboardControls from '../features/dashboard/DashboardControls/DashboardControls';
import DashboardList from '../features/dashboard/DashboardList/DashboardList';
import DashboardFormWrapper from '../features/dashboard/DashboardFormWrapper/DashboardFormWrapper';
import MassActionPopup from '../features/dashboard/MassActionPopup/MassActionPopup';


type DashboardPageProps = {
	mode: DashboardMode;
}

export default function DashboardPage({mode}: DashboardPageProps){
	const [formConfiguration, setFormConfiguration] = useState<{isDisplayed: boolean, type: DashboardFormType, selectedId?: number}>({isDisplayed: false, type: 'add', selectedId: undefined});
	const [massActionPopupConfiguration, setMassActionPopupConfiguration] = useState<{selected: Set<number>}>({selected: new Set<number>()});
	const [recordCount, setRecordCount] = useState<number>(0);
	const [refreshToken, setRefreshToken] = useState<number>(0);
	const [queryState, setQueryState] = useState<QueryState>({searchPhrase: '', pageSize: 9, currentPage: 1, filters: []});

	const { t } = useTranslation();

	const host = import.meta.env.VITE_API_URL;

	useEffect(() => {
		fetchRecordCount();
	}, [mode, refreshToken, queryState]);

	function fetchRecordCount() {
		//TODO: userId shouldn't be 4, it's just for development
		const userId = 4;

		if (mode === 'JobOffer') {
			fetch(`${host}/api/joboffer/offers-count?userId=${userId}&searchPhrase=${queryState.searchPhrase}`)
				.then((response) => response.json())
				.then((data) => {
					if (!data){
						setRecordCount(0);
						return;
					}
					setRecordCount(data);
				})
				.catch((error) => console.log(error));
				
		} else if (mode === 'Application') {
			
			fetch(`${host}/api/application/applications-count?userId=${userId}&searchPhrase=${queryState.searchPhrase}`)
				.then((response) => response.json())
				.then((data) => {
					if (!data){
						setRecordCount(0);
						return;
					}
					setRecordCount(data);
				})
				.catch((error) => console.log(error));
		}
	}

	function callForm(type: DashboardFormType, selectedId?: number){
		setFormConfiguration({isDisplayed: true, type, selectedId});	
	}

	function onFormClose(){
		setFormConfiguration((prev) => ({ ...prev, isDisplayed: false}))
	}

	function onFormSubmit() {
		setRefreshToken((prev) => prev + 1);
		setMassActionPopupConfiguration({ selected: new Set<number>() });
	}

	function callMassActionPopup(selected: Set<number>){
		setMassActionPopupConfiguration({
			selected: new Set<number>(selected)
		});
	}

	function onDelete(){
		setRefreshToken((prev) => prev + 1);
		setMassActionPopupConfiguration({ selected: new Set<number>() });
	}

	function onSearch(searchPhrase: string){
		setRefreshToken((prev) => prev + 1);
		setQueryState((prev) => ({...prev, currentPage: 1, searchPhrase}));
	}

	function onPageChange(page: number) {
		setQueryState((prev) => ({...prev, currentPage: page}));
	}

	function setFilter(filter: Filter) {
		setRefreshToken((prev) => prev + 1);

		setQueryState((prev) => {
			const existingFilter = prev.filters.find(
				(element) => element.filterName === filter.filterName
			);

			if (existingFilter?.value === filter.value) {
				return prev;
			}

			return {
				...prev,
				currentPage: 1,
				filters: [
					...prev.filters.filter(
						(element) => element.filterName !== filter.filterName
					),
					filter,
				],
			};
		});
	}

	function onUnsetFilter(filterName: JobOffersFilterNames | ApplicationsFilterNames) {
		setQueryState((prev) => ({
			...prev,
			filters: prev.filters.filter((filter) => filter.filterName !== filterName)	
		}));
	}

	function onClearAllFilters(){
		setQueryState((prev) => ({
			...prev,
			filters: []
		}));
	}

  return(
    <div className={styles.dashboardPage}>
			<div className={`${styles.title} ${styles.dashboardSection}`}>
					<h3>
							{mode === 'JobOffer' ? t('jobOffers') : t('applications')}
					</h3>
			</div>
			<DashboardStats
					className={`${styles.stats} ${styles.dashboardSection}`}
					mode={mode}
					refreshToken={refreshToken}
					queryState={queryState}
					setFilter={setFilter}
			/>
			<DashboardControls
					className={`${styles.dashboardControls} ${styles.dashboardSection}`}
					mode={mode}
					callForm={callForm}
					filters={queryState.filters}
					setFilter={setFilter}
					onUnsetFilter={onUnsetFilter}
					onClearAllFilters={onClearAllFilters}
					onSearch={onSearch}
			/>
			<div className={`${styles.dashboardSection}`}>
				<DashboardList 
						mode={mode}
						callForm={callForm}
						callMassActionPopup={callMassActionPopup}
						refreshToken={refreshToken}
						recordCount={recordCount}
						queryState={queryState}
						onPageChange={onPageChange}
				/>
			</div>
			{formConfiguration.isDisplayed ? <DashboardFormWrapper mode={mode} type={formConfiguration.type} selectedId={formConfiguration.selectedId} onFormClose={onFormClose} onFormSubmit={onFormSubmit}/> : ''}
			{massActionPopupConfiguration.selected.size > 0 ? <MassActionPopup mode={mode} selected={massActionPopupConfiguration.selected} callForm={callForm} onFormClose={onFormClose} onDelete={onDelete} />: ''}
		</div>
  )
}