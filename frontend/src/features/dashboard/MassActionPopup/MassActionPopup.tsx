import styles from './MassActionPopup.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useState } from 'react';
import type { DashboardMode } from '../../../pages/DashboardPage/DashboardPage';
import type { DashboardFormType } from '../DashboardFormWrapper/DashboardFormWrapper';

type MassActionPopupProps = {
	mode: DashboardMode;
	apiQueryMap: Record<DashboardMode, string>;
	selected: Set<number>;
	callForm: (type: DashboardFormType, selectedId?: number) => void;
	onFormClose: () => void;
	onDelete: () => void;
}

type PopupType = 'edit' | 'delete' | null;

export default function MassActionPopup({mode, apiQueryMap, selected, onDelete, onFormClose, callForm}: MassActionPopupProps) {
	const host = import.meta.env.VITE_API_URL;
	const { t } = useTranslation();
	const [popupType, setPopupType] = useState<PopupType>(null);

	function handleMassActionButton(type: PopupType){
		if (popupType === type) {
			setPopupType(null);
		} else {
			if (popupType === 'edit') {
				onFormClose();
			}
			setPopupType(type);
		}

		if (type === 'edit') {
			callForm('edit', selected.values().next().value);
		}
		
	}

	const deletionOptions: RequestInit = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ids: [...selected]}),
		credentials: 'include'
  };

	function handleDeletion(){
			fetch(`${host}/api/${apiQueryMap[mode]}`, deletionOptions)
				.then(() => onDelete())
				.catch((error) => console.log(error));
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
				<button type='button' className={styles.editButton} onClick={() => {handleMassActionButton('edit')}} disabled={selected.size === 1 ? false : true}>{t('edit')}</button>
				<button type='button' className={styles.deleteButton} onClick={() => {handleMassActionButton('delete')}}>{t('delete')}</button>
			</div>
		</div>
		
	);
}