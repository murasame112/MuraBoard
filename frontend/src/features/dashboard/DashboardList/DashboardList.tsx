import styles from './DashboardList.module.css';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import JobOffersTable from '../job-offers/JobOffersTable/JobOffersTable';
import ApplicationsTable from '../applications/ApplicationsTable/ApplicationsTable';
import DashboardPager from '../DashboardPager/DashboardPager';
import type { DashboardFormType } from '../DashboardFormWrapper/DashboardFormWrapper';
import type { QueryState } from '../../../pages/DashboardPage';

type DashboardListProps = {
	mode: DashboardMode;
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	callMassActionPopup: (selected: Set<number>) => void;
	refreshToken: number;
	recordCount: number;
	queryState: QueryState;
	onPageChange: (page: number) => void;
}

export default function DashboardList({mode, callForm, callMassActionPopup, refreshToken, recordCount, queryState, onPageChange}: DashboardListProps){
	return (
        <div className={styles.dashboardList}>
            {mode === 'JobOffer' ? (
                <JobOffersTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
										refreshToken={refreshToken}
										queryState={queryState}
                />
            ) : (
                <ApplicationsTable
                    callForm={callForm}
                    callMassActionPopup={callMassActionPopup}
                />
            )}
						<DashboardPager recordCount={recordCount} queryState={queryState} onPageChange={onPageChange}/>
        </div>
    );

}