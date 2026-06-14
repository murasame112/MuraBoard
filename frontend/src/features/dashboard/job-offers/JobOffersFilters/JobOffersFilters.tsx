import styles from './JobOffersFilters.module.css';
import type {
    JobOfferFilter,
    JobOffersFilterNames,
} from '../../models/queryState';
import { useTranslation } from '../../../../shared/i18n/useTranslation';

type JobOfferFilterProps = {
    filters: JobOfferFilter[];
    onSetFilter: (filterName: JobOffersFilterNames) => void;
};

export default function JobOffersFilters({
    filters,
    onSetFilter,
}: JobOfferFilterProps) {
    const { t } = useTranslation();

    const availableFilters: JobOfferFilter[] = [
        { filterName: 'position' },
        { filterName: 'companyName' },
        { filterName: 'status' },
        { filterName: 'salaryMin' },
        { filterName: 'salaryMax' },
    ];

    return (
        <div className={styles.jobOffersFilters}>
            {availableFilters.map((element) => (
                <div
                    key={element.filterName}
                    className={`${styles.filterItem} ${filters.find((e) => e.filterName === element.filterName)?.value ? styles.filterItemActive : ''}`}
                    onClick={() => onSetFilter(element.filterName)}
                >
                    <p>{t(`filter.${element.filterName}`)}</p>
                </div>
            ))}
        </div>
    );
}
