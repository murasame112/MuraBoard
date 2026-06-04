import styles from './DashboardList.module.css';
import { useState, useEffect } from 'react';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import JobOffersTable from '../job-offers/JobOffersTable/JobOffersTable';
import ApplicationsTable from '../applications/ApplicationsTable/ApplicationsTable';

type DashboardListProps = {
	mode: DashboardMode;
	callForm: (type: string) => void;
	callMassActionPopup: (selected: Set<number>) => void;
}

export default function DashboardList({mode, callForm, callMassActionPopup}: DashboardListProps){
	const [recordCount, setRecordCount] = useState<number>(0);
	const pageLimit: number = 12;
	const host = import.meta.env.VITE_API_URL;

	useEffect(() => {
		fetchRecordCount()
	}, [mode]);

	function fetchRecordCount() {
		//TODO: implement fetchRecordCount
		setRecordCount(25);
	}


	return (
        <div className={styles.dashboardList}>
            {mode === 'JobOffer' ? (
                <JobOffersTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
                />
            ) : (
                <ApplicationsTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
                />
            )}
        </div>
    );

}