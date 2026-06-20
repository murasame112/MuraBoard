import { Prisma } from '../../generated/prisma/client.js';
import type { ParsedQuery } from "./jobOfferDashboardQueryParser.js";

export function buildJobOfferWhere(query: ParsedQuery) { 
	const {
		userId, 
		currentPage,
		pageSize,
		searchPhrase,
		filters
	} = query;
	
	const andConditions: Prisma.JobOfferWhereInput[] = [];


}