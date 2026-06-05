import { prisma } from '../db/prisma.js';

export async function getJobOffersDashboardData(userId: number, page: number, pageSize: number) {
	const offers = await prisma.jobOffer.findMany({
		where: {userId},
		orderBy: {createdAt: 'desc'},
		skip: (page - 1) * pageSize,
		take: pageSize,
		include: {
			company: true,
			application: true
		}
	});

	return offers;
}

export async function getJobOffersCount(userId: number) { 
	const count = await prisma.jobOffer.count({
		where: {userId}
	});
}