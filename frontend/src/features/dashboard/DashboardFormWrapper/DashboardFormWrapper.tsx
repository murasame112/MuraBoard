import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import ApplicationsForm from '../applications/ApplicationsForm/ApplicationsForm';
import JobOffersForm from '../job-offers/JobOffersForm/JobOffersForm';
import styles from './DashboardFormWrapper.module.css';

export type DashboardFormType = 'add' | 'edit';
//type={formConfiguration.type} mode={mode} onFormClose={onFormClose}

type DashboardFormWrapperProps = {
	mode: DashboardMode;
	type: DashboardFormType;
	selected?: Set<number>;
	onFormClose: () => void;
}


export default function DashboardFormWrapper({mode, type, onFormClose, selected = new Set<number>()}: DashboardFormWrapperProps){

	return (
        <div className={styles.jobOfferFormWrapper}>
            {mode === 'JobOffer' ? (
                <JobOffersForm />
            ) : mode === 'Application' ? (
                <ApplicationsForm />
            ) : (
                ''
            )}
        </div>
    );
}