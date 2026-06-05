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

export async function getApplicationsStats(userId: number) {
	const [
		applied,
		inProgress,
		interview,
		offer,
		rejected,
		summaryCount
	] = await prisma.$transaction([

		prisma.application.count({
			where: { userId, status: 'APPLIED' }
		}),

		prisma.application.count({
			where: { userId, status: 'IN_PROGRESS' }
		}),

		prisma.application.count({
			where: { userId, status: 'INTERVIEW' }
		}),

		prisma.application.count({
			where: { userId, status: 'OFFER' }
		}),

		prisma.application.count({
			where: { userId, status: 'REJECTED' }
		}),

		prisma.application.count({
			where: { userId }
		})
	]);

	return {summaryCount, stats: {applied, inProgress, interview, offer, rejected}};


}