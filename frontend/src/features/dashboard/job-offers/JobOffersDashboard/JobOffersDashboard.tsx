import { useTranslation } from '../../../../shared/i18n/useTranslation';
import { useState, useEffect} from 'react';
import DashboardStats from '../../DashboardStats/DashboardStats';
import DashboardControls from '../../DashboardControls/DashboardControls';
import DashboardList from '../../DashboardList/DashboardList';
import DashboardFormWrapper from '../../DashboardFormWrapper/DashboardFormWrapper';
import MassActionPopup from '../../MassActionPopup/MassActionPopup';
import type { DashboardController, DashboardMode } from '../../../../pages/DashboardPage/DashboardPage';

type JobOffersDashboardProps = {
  styles: Record<string, string>;
	dashboardController: DashboardController;
};

export default function JobOffersDashboard({styles, dashboardController}: JobOffersDashboardProps){
	const [recordCount, setRecordCount] = useState<number>(0);
	const { t } = useTranslation();
	const mode: DashboardMode = 'JobOffer';

	useEffect(() => {
		dashboardController.fetchRecordCount(mode).then(data => {
			if (!data) {
				setRecordCount(0);
				return;
			}
			setRecordCount(data);
		});
	}, [dashboardController.refreshToken, dashboardController.queryState.filters, dashboardController.queryState.searchPhrase]);


  return(
    <div className={styles.dashboardPage}>
			<div className={`${styles.title} ${styles.dashboardSection}`}>
					<h3>
							{t('jobOffers')}
					</h3>
			</div>
			<DashboardStats
					className={`${styles.stats} ${styles.dashboardSection}`}
					mode={mode}
					refreshToken={dashboardController.refreshToken}
					queryState={dashboardController.queryState}
					setFilter={dashboardController.filters.setFilter}
			/>
			<DashboardControls
					className={`${styles.dashboardControls} ${styles.dashboardSection}`}
					mode={mode}
					callForm={dashboardController.form.callForm}
					filters={dashboardController.queryState.filters}
					setFilter={dashboardController.filters.setFilter}
					onUnsetFilter={dashboardController.filters.onUnsetFilter}
					onClearAllFilters={dashboardController.filters.onClearAllFilters}
					onSearch={dashboardController.filters.onSearch}
			/>
			<div className={`${styles.dashboardSection} ${styles.dashboardList}`}>
				<DashboardList 
						mode={mode}
						callForm={dashboardController.form.callForm}
						callMassActionPopup={dashboardController.massActions.callMassActionPopup}
						refreshToken={dashboardController.refreshToken}
						recordCount={recordCount}
						queryState={dashboardController.queryState}
						onPageChange={dashboardController.pagination.onPageChange}
				/>
			</div>
			{dashboardController.form.formConfiguration.isDisplayed && 
					<DashboardFormWrapper 
							mode={mode} 
							type={dashboardController.form.formConfiguration.type} 
							selectedId={dashboardController.form.formConfiguration.selectedId} 
							onFormClose={dashboardController.form.onFormClose} 
							onFormSubmit={dashboardController.form.onFormSubmit}/> 
			}
			{dashboardController.massActions.massActionPopupConfiguration.selected.size > 0 && 
					<MassActionPopup 
							mode={mode} 
							apiQueryMap={dashboardController.apiQueryMap}
							selected={dashboardController.massActions.massActionPopupConfiguration.selected} 
							callForm={dashboardController.form.callForm} 
							onFormClose={dashboardController.form.onFormClose} 
							onDelete={dashboardController.massActions.onDelete} />
			}
		</div>
  )
}