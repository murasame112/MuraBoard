import styles from './DashboardManagement.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type DashboardManagementProps = {
	className: string;
}


export default function DashboardManagement({className}: DashboardManagementProps) {
	const { t } = useTranslation();
	
	return(
		<div className={`${className}`}>
			<div className={styles.searchWrapper}>
				<MagnifyingGlassIcon className={styles.searchIcon} />
				<input
					className={styles.searchBar}
					placeholder={t('search')}
				/>
			</div>
			<button className={styles.filterButton}><FunnelIcon className={styles.filterIcon}/>{t('addFilter')}</button>
		</div>
	);
}