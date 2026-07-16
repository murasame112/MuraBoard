import styles from './DashboardPage.module.css';
import {Routes, Route} from 'react-router';
import ApplicationsDashboard from '../../features/dashboard/applications/ApplicationsDashboard/ApplicationsDashboard';
import JobOffersDashboard from '../../features/dashboard/job-offers/JobOffersDashboard/JobOffersDashboard';
import type { Filter, FilterName, QueryState } from '../../features/dashboard/models/queryState';
import type { DashboardFormType } from '../../features/dashboard/DashboardFormWrapper/DashboardFormWrapper';
export type DashboardMode = 'JobOffer' | 'Application';
import { buildQueryParams } from '../../shared/lib/buildQueryParams';
import { useState, useCallback } from 'react';

type MassActionPopupConfiguration = {
	selected: Set<number>;
}

type FormConfiguration = {
	isDisplayed: boolean;
	type: DashboardFormType;
	selectedId?: number;
}

export type DashboardController = {
	queryState: QueryState;
	refreshToken: number;
	apiQueryMap: Record<DashboardMode, string>;

	fetchRecordCount: (mode: DashboardMode) => Promise<number>;

	form: {
		callForm: (type: DashboardFormType, selectedId?: number) => void;
		onFormClose: () => void;
		onFormSubmit: () => void;
		formConfiguration: FormConfiguration;
	};

	filters: {
		onSearch: (searchPhrase: string) => void;
		setFilter: (filter: Filter) => void;
		onUnsetFilter: (filterName: FilterName) => void;
		onClearAllFilters: () => void;
	};

	pagination: {
		onPageChange: (page: number) => void;
	};

	massActions: {
		callMassActionPopup: (selected: Set<number>) => void;
		onDelete: () => void;
		massActionPopupConfiguration: MassActionPopupConfiguration;
	};
};

export default function DashboardPage(){
	const [formConfiguration, setFormConfiguration] = useState<{isDisplayed: boolean, type: DashboardFormType, selectedId?: number}>({isDisplayed: false, type: 'add', selectedId: undefined});
	const [massActionPopupConfiguration, setMassActionPopupConfiguration] = useState<{selected: Set<number>}>({selected: new Set<number>()});
	const [refreshToken, setRefreshToken] = useState<number>(0);
	const [queryState, setQueryState] = useState<QueryState>({searchPhrase: '', pageSize: 9, currentPage: 1, filters: []});

	const apiQueryMap: Record<DashboardMode, string> = {
		'JobOffer': 'joboffer',
		'Application': 'application'
	};

	const host = import.meta.env.VITE_API_URL;

	async function fetchRecordCount(mode: DashboardMode): Promise<number> {
		const query = buildQueryParams(queryState);

		const response = await fetch(`${host}/api/${apiQueryMap[mode]}/offers-count?${query}`, {credentials: 'include'});
		return response.json();

	}

	function callForm(type: DashboardFormType, selectedId?: number): void{
		setFormConfiguration({isDisplayed: true, type, selectedId});	
	}

	function onFormClose(): void{
		setFormConfiguration((prev) => ({ ...prev, isDisplayed: false}))
	}

	function onFormSubmit(): void {
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

	const onSearch = useCallback((searchPhrase: string) => {
		setQueryState((prev) => ({...prev, currentPage: 1, searchPhrase}));
	}, []);

	function onPageChange(page: number) {
		setQueryState((prev) => ({...prev, currentPage: page}));
	}

	function setFilter(filter: Filter) {
		setQueryState((prev) => ({
			...prev,
			currentPage: 1,
			filters: [
				...prev.filters.filter(
					(element) => element.filterName !== filter.filterName
				),
				filter,
			],
		}));
	}

	function onUnsetFilter(filterName: FilterName) {
		setQueryState((prev) => ({
			...prev,
			currentPage: 1,
			filters: prev.filters.filter((filter) => filter.filterName !== filterName)	
		}));
	}

	function onClearAllFilters(){
		setQueryState((prev) => ({
			...prev,
			currentPage: 1,
			filters: []
		}));
	}

	const dashboardController: DashboardController = {
		queryState,
		refreshToken,
		fetchRecordCount,
		apiQueryMap,
		form: {
			callForm,
			onFormClose,
			onFormSubmit,
			formConfiguration
		},
		filters: {
			onSearch,
			setFilter,
			onUnsetFilter,
			onClearAllFilters
		},
		pagination: {
			onPageChange
		},
		massActions: {
			callMassActionPopup,
			onDelete,
			massActionPopupConfiguration
		}
	};

  return(
    <Routes>
        <Route path="job-offers/*" element={<JobOffersDashboard styles={styles} dashboardController={dashboardController}/>} />
        <Route path="applications/*" element={<ApplicationsDashboard styles={styles} dashboardController={dashboardController}/>} />
    </Routes>
  )
}