import styles from './DashboardControls.module.css';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
// import DashboardJobOfferForm from '../DashboardJobOfferForm/DashboardJobOfferForm'; TODO:

type DashboardControlsProps = {
	className: string;
	mode: string;
	addJobOfferCalled: boolean;
}


export default function DashboardControls({className, mode, addJobOfferCalled}: DashboardControlsProps) {
	const { t } = useTranslation();
	const [formVisible, setFormVisible] = useState<boolean>(false); //TODO:

	// function closeFunc(){
	// 	setFormVisible(false);
	// 	onFormClose();
	// }

	// function callRefetch(){
	// 	refetch();
	// }

	// useEffect(() => {
	// 	if (addJobOfferCalled) setFormVisible(true);
	// }, [addJobOfferCalled]);
	
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
			<button type='button' className={styles.addButton} onClick={() => setFormVisible(true)}><PlusIcon className={styles.plusIcon}/>{t('add')} {t(mode)}</button>
			{/* {mode === 'JobOffer' && formVisible ? <DashboardJobOfferForm close={closeFunc} refetch={callRefetch}/> : null } TODO: */}
			
		</div>
	);
}