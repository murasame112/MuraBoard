import { useTranslation } from '../../shared/i18n/useTranslation';
import { NavLink } from 'react-router';

export default function NotFoundPage() {
	const { t } = useTranslation();

	return (
		<>
			<p>{t('pageNotFound')}</p>
			<NavLink to={'/dashboard/job-offers'}>{t('home')}</NavLink>
		</>
	); 

}