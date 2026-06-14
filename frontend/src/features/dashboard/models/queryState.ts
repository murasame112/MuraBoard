
export type PositionFilter = {
	filterName: 'position',
	value?: string
};

export type CompanyNameFilter = {
	filterName: 'companyName',
	value?: string
};

export type JobOfferStatusFilter = {
	filterName: 'status',
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

export type ApplicationFilter = {/* TODO: */};


export type Filter = JobOfferFilter | ApplicationFilter;

export type QueryState = {
	searchPhrase: string;
	pageSize: number;
	currentPage: number;
	filters: Filter[]
}