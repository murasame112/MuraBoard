import { prisma } from '../db/prisma.js';

export async function getApplicationsDashboardData(userId: number, page: number, pageSize: number) {
	const offers = await prisma.application.findMany({
		where: {userId},
		orderBy: {appliedAt: 'desc'},
		skip: (page - 1) * pageSize,
		take: pageSize,
		include: {
			jobOffer: false
		}
	});

	return offers;
}

export async function getApplicationsCount(userId: number) { 
	const count = await prisma.application.count({
		where: {userId}
	});
}