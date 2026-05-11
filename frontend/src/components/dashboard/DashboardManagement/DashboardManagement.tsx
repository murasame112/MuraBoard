import styles from './DashboardManagement.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

type DashboardManagementProps = {
	className: string;
	mode: string;
}


export default function DashboardManagement({className, mode}: DashboardManagementProps) {
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
			<button className={styles.addButton}><PlusIcon className={styles.plusIcon}/>{t('add')} {mode}</button>
		</div>
	);
}