import styles from './MassActionPopup.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';

type MassActionPopupProps = {
	selected: Set<number>;
}

export default function MassActionPopup({selected}: MassActionPopupProps) {
	const { t } = useTranslation();

	return (
		<div className={styles.massActionPopup}>
			<h4>{selected.size} {selected.size === 1 ? t('itemSelected') : t('itemsSelected')}</h4>
			<h6>{t('selectAction')}</h6>
			<div className={styles.buttons}>
				<button className={styles.editButton}>{t('edit')}</button>
				<button className={styles.deleteButton}>{t('delete')}</button>
			</div>
		</div>
	);
}