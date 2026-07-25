import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../contexts/auth/AuthProvider';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner/LoadingSpinner';

export default function GuestRoute() {
	const { isAuthenticated, loading } = useAuth();
	const { t } = useTranslation();

	if (loading)  return <LoadingSpinner text={`${t("loading")} - ${t('mayTakeAMinOrTwo')}` } />;

	if (isAuthenticated) return <Navigate to='/dashboard/job-offers' replace/>

	return (
		<Outlet/>
	);
}