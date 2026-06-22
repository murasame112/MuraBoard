import { Prisma, ApplicationStatus } from '../../generated/prisma/client.js';
import type { ParsedQuery } from './applicationDashboardQueryParser.js';

export function buildApplicationWhere(query: ParsedQuery): Prisma.ApplicationWhereInput { 
	const {
		userId,
		searchPhrase,
		filters
	} = query;

	const applicationStatusMap = {
		applied: ApplicationStatus.APPLIED,
		inProgress: ApplicationStatus.IN_PROGRESS,
		interview: ApplicationStatus.INTERVIEW,
		offer: ApplicationStatus.OFFER,
		rejected: ApplicationStatus.REJECTED,
	} as const;
	
	const andConditions: Prisma.ApplicationWhereInput[] = [];

	if (searchPhrase.length > 0) {
		andConditions.push({
			jobOffer: {
				OR: [
					{ position: { contains: searchPhrase, mode: 'insensitive'} },
					{ company: { is: { name: { contains: searchPhrase, mode: 'insensitive'} } } }
				]
			}
		});
	}

	filters.forEach((element) => {
		switch (element.filterName) {

			case 'position':
				andConditions.push({
					jobOffer: {
						position: {
							contains: element.value,
							mode: 'insensitive'
						}
					}
				});
				break;

			case 'companyName':
				andConditions.push({
					jobOffer: {
						company: {
							is: {
								name: {
									contains: element.value,
									mode: 'insensitive'
								}
							}
						}
					}
				});
				break;

			case 'applicationStatus':
				andConditions.push(
					{
						status: applicationStatusMap[element.value]
					}
				);
				break;

			case 'applicationDateFrom':
				andConditions.push({
					appliedAt: {
						gte: element.value
					}
				});
				break;

			case 'applicationDateTo':
				andConditions.push({
					appliedAt: {
						lte: element.value
					}
				});
				break;
		}
	});

	return { userId: userId, ...(andConditions.length > 0 ? { AND: andConditions } : {})};
}