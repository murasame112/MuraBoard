import styles from './DashboardNav.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';

export default function DashboardNav() {
	const {t} = useTranslation();

  return(
    <div className={styles.dashboardNav}>
      <h1 className='anta'><span style={{color:'var(--white)'}}>Mura</span><span style={{color:'var(--main-theme)'}}>Board</span></h1>
			<div className={styles.navElements}>
				<h3 className={styles.debugActive }>{t('jobOffers')}</h3>
				{/* TODO: ^ active only for debugging */}
				<h3>{t('applications')}</h3>
			</div>
			<div className={styles.accountElements}>
				<h3>{t('logout')}</h3>
			</div>
    </div>
  )
}