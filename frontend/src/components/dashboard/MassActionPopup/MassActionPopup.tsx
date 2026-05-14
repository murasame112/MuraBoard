import styles from './MassActionPopup.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useState } from 'react';

type MassActionPopupProps = {
	selected: Set<number>;
	onDelete: () => void;
}

type ExtraPopup = 'edit' | 'delete' | null;

export default function MassActionPopup({selected, onDelete}: MassActionPopupProps) {
	const host = import.meta.env.VITE_API_URL;
	const { t } = useTranslation();
	const [extraPopupVisible, setExtraPopupVisible] = useState<ExtraPopup>(null);

	function handleMassActionButton(e: React.MouseEvent<HTMLButtonElement>, type: ExtraPopup){
		if (extraPopupVisible === type) {
			setExtraPopupVisible(null);
		} else {
			setExtraPopupVisible(type);
		}
	}

	const deletionOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ids: [...selected]}),
  };

	function handleDeletion(){
		fetch(`${host}/api/joboffer/delete-many`, deletionOptions)
			.then((response) => response.json())
			.then(() => {setExtraPopupVisible(null)})
			.then(() => {onDelete()});
	}
	
	let editPopup = <div className={styles.extraPopup}>Edit</div>;
	let deletePopup = 
		<div className={`${styles.extraPopup} ${styles.deletePopup}`}>
			<h4>{t('areYouSure')}?</h4>
			<div className={styles.deletePopupButtons}>
				<button onClick={handleDeletion}>{t('yes')}</button>
			</div>
			
		</div>;

	return (
		<div className={styles.massActionPopup}>
			{
				extraPopupVisible === 'edit' ? (
					editPopup
				) : extraPopupVisible === 'delete' ? (
					deletePopup
				) : null
			}
			<h4>{selected.size} {selected.size === 1 ? t('itemSelected') : t('itemsSelected')}</h4>
			<h6>{t('selectAction')}</h6>
			<div className={styles.buttons}>
				<button className={styles.editButton} onClick={(e) => {handleMassActionButton(e, 'edit')}}>{t('edit')}</button>
				<button className={styles.deleteButton} onClick={(e) => {handleMassActionButton(e, 'delete')}}>{t('delete')}</button>
			</div>
		</div>
		
	);
}