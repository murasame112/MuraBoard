import styles from './DashboardList.module.css';
import { useState, useEffect } from 'react';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import JobOffersTable from '../job-offers/JobOffersTable/JobOffersTable';
import ApplicationsTable from '../applications/ApplicationsTable/ApplicationsTable';
import DashboardPager from '../DashboardPager/DashboardPager';

type DashboardListProps = {
	mode: DashboardMode;
	callForm: (type: string) => void;
	callMassActionPopup: (selected: Set<number>) => void;
}

export default function DashboardList({mode, callForm, callMassActionPopup}: DashboardListProps){
	const [recordCount, setRecordCount] = useState<number>(0);
	const pageSize: number = 9;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const host = import.meta.env.VITE_API_URL;

	useEffect(() => {
		fetchRecordCount()
	}, [mode]);

	function fetchRecordCount() {
		//TODO: userId shouldn't be 4, it's just for development
		const userId = 4;

		if (mode === 'JobOffer') {
			fetch(`${host}/api/joboffer/offers-count?userId=${userId}`)
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
			
			fetch(`${host}/api/application/applications-count?userId=${userId}`)
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

	return (
        <div className={styles.dashboardList}>
            {mode === 'JobOffer' ? (
                <JobOffersTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
										currentPage={currentPage}
										pageSize={pageSize}
                />
            ) : (
                <ApplicationsTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
                />
            )}
							<DashboardPager/>
        </div>
    );

}