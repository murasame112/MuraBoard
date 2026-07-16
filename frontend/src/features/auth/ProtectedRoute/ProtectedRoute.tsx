import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../contexts/auth/AuthProvider';
import { useTranslation } from '../../../shared/i18n/useTranslation';

export default function ProtectedRoute() {
	const { isAuthenticated, loading } = useAuth();
	const { t } = useTranslation();

	if (loading)  return <p>{t('loading')}...</p>;

	if (!isAuthenticated) return <Navigate to='/login' replace/>

	return (
		<Outlet/>
	);
}