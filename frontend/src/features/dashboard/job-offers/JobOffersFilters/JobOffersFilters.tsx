import styles from './JobOffersFilters.module.css';
import type { JobOfferFilter } from '../../models/queryState';
import { useTranslation } from '../../../../shared/i18n/useTranslation';

type JobOfferFilterProps = {
	filters: JobOfferFilter[];
}

export default function JobOffersFilters({filters}: JobOfferFilterProps){
	const { t } = useTranslation();

	const availableFilters: JobOfferFilter[] = [
		{ filterName: 'position' }, 
		{ filterName: 'companyName' }, 
		{ filterName: 'status' }, 
		{ filterName: 'salaryMin' }, 
		{ filterName: 'salaryMax' }
	];
	

	function setFilter(field: string){
		
	}

	return (
		<>
			{availableFilters.map((element) => (
				<div key={element.filterName} onClick={() => setFilter(element.filterName)}>
					<p>{t(element.filterName)}
					{filters.find((e) => e.filterName === element.filterName)?.value ? ' active' : ' not active'}
					</p>
				</div>
			))}
		</>
	);
}