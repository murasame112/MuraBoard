export type FilterName =
  | 'position'
  | 'companyName'
  | 'salaryMin'
  | 'salaryMax'
  | 'jobOfferStatus'
  | 'applicationStatus'
	| 'applicationDateFrom'
	| 'applicationDateTo';

export type ApplicationsFilterNames = 'status'; //TODO:

export type PositionFilter = {
	filterName: 'position',
	value?: string
};

export type CompanyNameFilter = {
	filterName: 'companyName',
	value?: string
};

export type JobOfferStatusFilter = {
	filterName: 'jobOfferStatus',
	value?: 'applied' | 'notApplied';
};

export type SalaryMinFilter = {
	filterName: 'salaryMin',
	value?: number;
};

export type SalaryMaxFilter = {
	filterName: 'salaryMax',
	value?: number;
};

export type JobOfferFilter = PositionFilter | CompanyNameFilter | JobOfferStatusFilter | SalaryMinFilter | SalaryMaxFilter;

export type ApplicationStatusFilter = {
	filterName: 'applicationStatus',
	value?: 'APPLIED' | 'IN_PROGRESS' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
}

export type ApplicationDateFromFilter = {
	filterName: 'applicationDateFrom',
	value?: string;
}

export type ApplicationDateToFilter = {
	filterName: 'applicationDateTo',
	value?: string;
}

export type ApplicationFilter = PositionFilter | CompanyNameFilter | ApplicationStatusFilter | ApplicationDateFromFilter | ApplicationDateToFilter;


export type Filter = JobOfferFilter | ApplicationFilter;

export type QueryState = {
	searchPhrase: string;
	pageSize: number;
	currentPage: number;
	filters: Filter[];
}