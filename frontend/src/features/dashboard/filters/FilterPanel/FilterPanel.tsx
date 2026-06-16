import type { ApplicationsFilterNames, Filter, JobOffersFilterNames}  from '../../models/queryState';
import styles from './FilterPanel.module.css';
import { useTranslation } from '../../../../shared/i18n/useTranslation';

type FilterPanelProps = {
	filters: Filter[];
	onUnsetFilter: (filterName: JobOffersFilterNames | ApplicationsFilterNames) => void;
	onClearAllFilters: () => void;
}

export default function FilterPanel({filters, onUnsetFilter, onClearAllFilters}: FilterPanelProps){
	const { t } = useTranslation();
	

	return (
		<div className={styles.filterPanel}>
			{filters.map((element) => (
				<div className={styles.filterElement} onClick={() => onUnsetFilter(element.filterName)} key={element.filterName}>
					{ element.filterName === 'status' ? `${element.filterName}: ${t(element.value as string)}` : `${element.filterName}: ${element.value}` }
				</div>
			))}
			<button type='button' className={styles.clearAll} onClick={onClearAllFilters}>{t('clearAllFilters')}</button>
		</div>
	);
}