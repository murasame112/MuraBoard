import type { QueryState } from "../../features/dashboard/models/queryState";

export function buildQueryParams(queryState: QueryState) {
	const params = new URLSearchParams();

	params.append('currentPage', String(queryState.currentPage));
	params.append('pageSize', String(queryState.pageSize));

	if (queryState.searchPhrase) {
		params.append('searchPhrase', queryState.searchPhrase);
	}

	queryState.filters.forEach((filter) => {
		if (filter.value !== undefined) {
			params.append(filter.filterName, String(filter.value));
		}
	});

	return params.toString();
}