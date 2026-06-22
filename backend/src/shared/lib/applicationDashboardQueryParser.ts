export type RequestQuery = {
	userId?: string;
	currentPage?: string;
	pageSize?: string;
	searchPhrase?: string;
	position?: string;
	companyName?: string;
	applicationStatus?: string;
	applicationDateFrom?: string;
	applicationDateTo?: string;
}

type PositionFilter = {
	filterName: 'position',
	value: string
};

type CompanyNameFilter = {
	filterName: 'companyName',
	value: string
};

type ApplicationStatusValue = 'applied' | 'inProgress' | 'interview' | 'offer' | 'rejected';

type ApplicationStatusFilter = {
	filterName: 'applicationStatus',
	value: ApplicationStatusValue;
};

function isApplicationStatusValue(value: string): value is ApplicationStatusValue {
	return value === 'applied' || value === 'inProgress' || value === 'interview' || value === 'offer' || value === 'rejected' ;
}

type ApplicationDateFromFilter = {
	filterName: 'applicationDateFrom',
	value: Date;
};

type ApplicationDateToFilter = {
	filterName: 'applicationDateTo',
	value: Date;
};

type Filter = PositionFilter | CompanyNameFilter | ApplicationStatusFilter | ApplicationDateFromFilter | ApplicationDateToFilter;


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

	if ( query.applicationStatus !== undefined ) {
		if (!isApplicationStatusValue(query.applicationStatus)) {
			return { ok: false, error: 'Invalid application status' };
		}
		filters.push({filterName: 'applicationStatus', value: query.applicationStatus});
	}

	if ( query.applicationDateFrom !== undefined) {
		const dt = new Date(query.applicationDateFrom );
		if (Number.isNaN(dt.getTime())) { 
			return { ok: false, error: 'Invalid date range' };
		}
		filters.push({filterName: 'applicationDateFrom', value: dt});
	}

	if ( query.applicationDateTo !== undefined) {
		const dt = new Date(query.applicationDateTo );
		if (Number.isNaN(dt.getTime())) { 
			return { ok: false, error: 'Invalid date range' };
		}
		filters.push({filterName: 'applicationDateTo', value: dt});
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