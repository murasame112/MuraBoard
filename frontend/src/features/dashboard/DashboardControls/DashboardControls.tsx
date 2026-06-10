import styles from './DashboardControls.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { DashboardFormType } from '../DashboardFormWrapper/DashboardFormWrapper';
import { useState, useEffect } from 'react';

type DashboardControlsProps = {
	className: string;
	mode: string;
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	onSearch: (searchPhrase: string) => void;
}

export default function DashboardControls({className, mode, callForm, onSearch}: DashboardControlsProps) {
	const { t } = useTranslation();
	const [searchPhrase, setSearchPhrase] = useState<string>('');

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>){
		setSearchPhrase(e.currentTarget.value);
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onSearch(searchPhrase.trim());
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		}
	}, [searchPhrase]);

	return(
		<div className={`${className}`}>
			<div className={styles.searchWrapper}>
				<MagnifyingGlassIcon className={styles.searchIcon} />
				<input
					className={styles.searchBar}
					value={searchPhrase}
					onChange={handleSearch}
					placeholder={t('search')}
				/>
			</div>
			<button type='button' className={styles.filterButton}><FunnelIcon className={styles.filterIcon}/>{t('addFilter')}</button>
			<button type='button' className={styles.addButton} onClick={() => callForm('add')}><PlusIcon className={styles.plusIcon}/>{t('add')} {t(mode)}</button>
		</div>
	);
}