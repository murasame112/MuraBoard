import styles from './DashboardControls.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

type DashboardControlsProps = {
	className: string;
	mode: string;
	callForm: (type: string) => void;
}


export default function DashboardControls({className, mode, callForm}: DashboardControlsProps) {
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
			<button type='button' className={styles.filterButton}><FunnelIcon className={styles.filterIcon}/>{t('addFilter')}</button>
			<button type='button' className={styles.addButton} onClick={() => callForm('add')}><PlusIcon className={styles.plusIcon}/>{t('add')} {t(mode)}</button>
		</div>
	);
}