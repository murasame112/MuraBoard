export type JobOffersFilterNames = 
			| 'position'
			| 'companyName'
			| 'status'
			| 'salaryMin'
			| 'salaryMax';

export type ApplicationsFilterNames = 'status'; //TODO:

export type PositionFilter = {
	filterName: JobOffersFilterNames,
	value?: string
};

export type CompanyNameFilter = {
	filterName: JobOffersFilterNames,
	value?: string
};

export type JobOfferStatusFilter = {
	filterName: JobOffersFilterNames,
	value?: 'applied' | 'notApplied';
};

export type SalaryMinFilter = {
	filterName: JobOffersFilterNames,
	value?: number;
};

export type SalaryMaxFilter = {
	filterName: JobOffersFilterNames,
	value?: number;
};

export type JobOfferFilter = PositionFilter | CompanyNameFilter | JobOfferStatusFilter | SalaryMinFilter | SalaryMaxFilter;

export type ApplicationStatusFilter = {
	filterName: 'status',
	value?: 'applied' | 'rejected' //TODO:
}

export type ApplicationFilter = ApplicationStatusFilter;


export type Filter = JobOfferFilter | ApplicationFilter;

export type QueryState = {
	searchPhrase: string;
	pageSize: number;
	currentPage: number;
	filters: Filter[];
}