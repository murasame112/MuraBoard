import { Prisma } from '../../generated/prisma/client.js';
import type { ParsedQuery } from "./jobOfferDashboardQueryParser.js";

export function buildJobOfferWhere(query: ParsedQuery): Prisma.JobOfferWhereInput { 
	const {
		userId,
		searchPhrase,
		filters
	} = query;
	
	const andConditions: Prisma.JobOfferWhereInput[] = [];

	if (searchPhrase.length > 0) {
		andConditions.push({
			OR: [
				{ position: { contains: searchPhrase, mode: 'insensitive'} },
				{ company: { is: { name: { contains: searchPhrase, mode: 'insensitive'} } } }
			]
		});
	}

	filters.forEach((element) => {
		switch (element.filterName) {
			case 'position':
				andConditions.push({
					position: {
						contains: element.value,
						mode: 'insensitive'
					}
				});
				break;
			case 'companyName':
				andConditions.push({
					company: {
						is: {
							name: {
								contains: element.value,
								mode: 'insensitive'
							}
						}
					}
				});
				break;
			case 'jobOfferStatus':
				andConditions.push(element.value === 'applied' 
					? { application: { isNot: null}} 
					: { application: { is: null }});
				break;
			case 'salaryMin':
				andConditions.push({
					salaryMin: {
						gte: element.value
					}
				});
				break;
			case 'salaryMax':
				andConditions.push({
					salaryMax: {
						lte: element.value
					}
				});
				break;
		}
	});

	return { userId: userId, ...(andConditions.length > 0 ? { AND: andConditions } : {})};
}