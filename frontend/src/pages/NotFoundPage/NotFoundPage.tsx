import { useTranslation } from '../../shared/i18n/useTranslation';

export default function NotFoundPage() {
	const { t } = useTranslation();

	return <p>{t('pageNotFound')}</p>;

}