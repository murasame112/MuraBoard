import styles from './DashboardList.module.css';
import { useState, useEffect } from 'react';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import JobOffersTable from '../job-offers/JobOffersTable/JobOffersTable';
import ApplicationsTable from '../applications/ApplicationsTable/ApplicationsTable';
import DashboardPager from '../DashboardPager/DashboardPager';
import type { DashboardFormType } from '../DashboardFormWrapper/DashboardFormWrapper';

type DashboardListProps = {
	mode: DashboardMode;
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	callMassActionPopup: (selected: Set<number>) => void;
	refreshToken: number;
	searchPhrase: string;
	recordCount: number;
	pageSize: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function DashboardList({mode, callForm, callMassActionPopup, refreshToken, searchPhrase, recordCount, pageSize, currentPage, setCurrentPage}: DashboardListProps){
	return (
        <div className={styles.dashboardList}>
            {mode === 'JobOffer' ? (
                <JobOffersTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
										currentPage={currentPage}
										pageSize={pageSize}
										refreshToken={refreshToken}
										searchPhrase={searchPhrase}
                />
            ) : (
                <ApplicationsTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
                />
            )}
						<DashboardPager recordCount={recordCount} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage}/>
        </div>
    );

}