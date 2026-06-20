import styles from './AppNavigation.module.css';
import { useTranslation } from '../../../shared/i18n/useTranslation';
export type DashboardMode = 'JobOffer' | 'Application';

type AppNavigationProps = {
	mode: DashboardMode;
	setMode: React.Dispatch<React.SetStateAction<DashboardMode>>;
}

export default function AppNavigation({mode, setMode}: AppNavigationProps) {
	const {t} = useTranslation();

  return(
    <div className={styles.appNavigation}>
      <h1 className='anta'><span style={{color:'var(--white)'}}>Mura</span><span style={{color:'var(--main-theme)'}}>Board</span></h1>

			<div className={styles.navElements}>
				<div className={styles.navTitle}><p>{t('navigation')}</p></div>
				<h3 className={mode === 'JobOffer' ? styles.active : ''} onClick={() => setMode('JobOffer')}>{t('jobOffers')}</h3>
				<h3 className={mode === 'Application' ? styles.active : ''} onClick={() => setMode('Application')}>{t('applications')}</h3>
			</div>
			<div className={styles.accountElements}>
				<div className={styles.navTitle}><p>{t('account')}</p></div>
				<h3>{t('logout')}</h3>
			</div>
    </div>
  )
}