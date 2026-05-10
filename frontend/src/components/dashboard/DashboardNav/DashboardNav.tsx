import styles from './DashboardNav.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';

export default function DashboardNav() {
	const {t} = useTranslation();

  return(
    <div className={styles.dashboardNav}>
      <h1 className='anta'><span style={{color:'var(--white)'}}>Mura</span><span style={{color:'var(--main-theme)'}}>Board</span></h1>
			<p>{t('smth')}</p>
    </div>
  )
}