export type RequestQuery = {
	userId?: string;
	currentPage?: string;
	pageSize?: string;
	searchPhrase?: string;
	position?: string;
	companyName?: string;
	jobOfferStatus?: string;
	salaryMin?: string;
	salaryMax?: string;
}

type PositionFilter = {
	filterName: 'position',
	value: string
};

type CompanyNameFilter = {
	filterName: 'companyName',
	value: string
};

type JobOfferStatusValue = 'applied' | 'notApplied';

type JobOfferStatusFilter = {
	filterName: 'jobOfferStatus',
	value: JobOfferStatusValue;
};

function isJobOfferStatusValue(value: string): value is JobOfferStatusValue {
	return value === 'applied' || value === 'notApplied';
}

type SalaryMinFilter = {
	filterName: 'salaryMin',
	value: number;
};

type SalaryMaxFilter = {
	filterName: 'salaryMax',
	value: number;
};

type Filter = PositionFilter | CompanyNameFilter | JobOfferStatusFilter | SalaryMinFilter | SalaryMaxFilter;


export type ParsedQuery = {
	userId: number;
	currentPage: number;
	pageSize: number;
	searchPhrase: string;
	filters: Filter[];
	ok: true;
}

type ParseError = {
	ok: false;
	error: string;
}

export function parse(query: RequestQuery): ParsedQuery | ParseError{

	if (!query.userId || Number.isNaN(Number(query.userId))) {
		return { ok: false, error: 'Invalid user id' };
	}
	const userId = Number(query.userId);

	if (!query.currentPage || Number.isNaN(Number(query.currentPage))) {
		return { ok: false, error: 'Invalid page' };
	}
	const currentPage = Number(query.currentPage);

	if (!query.pageSize || Number.isNaN(Number(query.pageSize))) {
		return { ok: false, error: 'Invalid pageSize' };
	}
	const pageSize = Number(query.pageSize);
	const searchPhrase = query.searchPhrase?.trim() ?? '';
	const filters: Filter[] = [];

	if ( query.position !== undefined) {
		filters.push({filterName: 'position', value: query.position});
	}

	if ( query.companyName !== undefined) {
		filters.push({filterName: 'companyName', value: query.companyName});
	}

	if ( query.jobOfferStatus !== undefined ) {
		if (!isJobOfferStatusValue(query.jobOfferStatus)) {
			return { ok: false, error: 'Invalid job offer status' };
		}
		filters.push({filterName: 'jobOfferStatus', value: query.jobOfferStatus});
	}

	if ( query.salaryMin !== undefined) {
		if (Number.isNaN(Number(query.salaryMin))) { 
			return { ok: false, error: 'Invalid minimum salary' };
		}
		filters.push({filterName: 'salaryMin', value: Number(query.salaryMin)});
	}

	if ( query.salaryMax !== undefined) {
		if (Number.isNaN(Number(query.salaryMax))) { 
			return { ok: false, error: 'Invalid maximum salary' };
		}
		filters.push({filterName: 'salaryMax', value: Number(query.salaryMax)});
	}

	return {
		userId,
		currentPage,
		pageSize,
		searchPhrase,
		filters,
		ok: true,
	}

}