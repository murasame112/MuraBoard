import styles from './MassActionPopup.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useState } from 'react';
import type { DashboardMode } from '../../../layouts/main-layout/AppNavigation/AppNavigation';
import type { DashboardFormType } from '../DashboardFormWrapper/DashboardFormWrapper';

type MassActionPopupProps = {
	mode: DashboardMode
	selected: Set<number>;
	callForm: (type: DashboardFormType, selected?: Set<number>) => void;
	onDelete: () => void;
}

type PopupType = 'edit' | 'delete' | null;

export default function MassActionPopup({mode, selected, onDelete, callForm}: MassActionPopupProps) {
	const host = import.meta.env.VITE_API_URL;
	const { t } = useTranslation();
	const [popupType, setPopupType] = useState<PopupType>(null);

	function handleMassActionButton(e: React.MouseEvent<HTMLButtonElement>, type: PopupType){
		if (popupType === type) {
			setPopupType(null);
		} else {
			setPopupType(type);
		}

		if (type === 'edit') {
			callForm('edit', selected)
		}
		
	}

	const deletionOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ids: [...selected]}),
  };

	function handleDeletion(){
		if (mode === 'JobOffer') {
			fetch(`${host}/api/joboffer/offers-delete`, deletionOptions)
				.then(() => onDelete())
				.catch((error) => console.log(error));

		} else if (mode === 'Application') {
			fetch(`${host}/api/application/applications-delete`, deletionOptions)
				.then(() => onDelete())
				.catch((error) => console.log(error));
		}
	}
	
	let deletePopup = 
		<div className={`${styles.extraPopup} ${styles.deletePopup}`}>
			<h4>{t('areYouSure')}?</h4>
			<div className={styles.deletePopupButtons}>
				<button type='button' onClick={handleDeletion}>{t('yes')}</button>
			</div>
		</div>;

	return (
		<div className={styles.massActionPopup}>
			{
				popupType === 'delete' ? (
					deletePopup
				) : ''
			}
			<h4>{selected.size} {selected.size === 1 ? t('itemSelected') : t('itemsSelected')}</h4>
			<h6>{t('selectAction')}</h6>
			<div className={styles.buttons}>
				<button type='button' className={styles.editButton} onClick={(e) => {handleMassActionButton(e, 'edit')}}>{t('edit')}</button>
				<button type='button' className={styles.deleteButton} onClick={(e) => {handleMassActionButton(e, 'delete')}}>{t('delete')}</button>
			</div>
		</div>
		
	);
}