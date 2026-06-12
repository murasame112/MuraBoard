export type TextFilter = {
	type: 'text';
	field: 'position' | 'companyName';
	value: string;
};

export type StatusFilter = {
	type: 'status';
	value: 'applied' | 'notApplied';
};

export type SalaryRangeFilter = {
	type: 'salaryRange';
	min?: number;
	max?: number;
}

export type Filter = TextFilter | StatusFilter | SalaryRangeFilter;

export type QueryState = {
	searchPhrase: string;
	pageSize: number;
	currentPage: number;
	filters: Filter[]
}