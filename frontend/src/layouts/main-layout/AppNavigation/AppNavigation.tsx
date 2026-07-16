import styles from './AppNavigation.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { useAuth } from '../../../contexts/auth/AuthProvider';
import { NavLink } from 'react-router';

export default function AppNavigation() {
	const { t } = useTranslation();
	const { logout } = useAuth();

  return(
    <div className={styles.appNavigation}>
      <h1 className='anta'><span style={{color:'var(--white)'}}>Mura</span><span style={{color:'var(--main-theme)'}}>Board</span></h1>

			<div className={styles.navElements}>
				<div className={styles.navTitle}><p>{t('navigation')}</p></div>
				<NavLink to={'/dashboard/job-offers'}	className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>{t('jobOffers')}</NavLink>
				<NavLink to={'/dashboard/applications'}	className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>{t('applications')}</NavLink>
			</div>
			<div className={styles.accountElements}>
				<div className={styles.navTitle}><p>{t('account')}</p></div>
				<h3 className={styles.navLink} onClick={logout}>{t('logout')}</h3>
			</div>
    </div>
  )
}