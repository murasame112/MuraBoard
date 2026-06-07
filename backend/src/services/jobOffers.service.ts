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

export async function getJobOffersStats(userId: number) {
	const [applied, notApplied, summaryCount] = await prisma.$transaction([

		prisma.jobOffer.count({
			where: {
				userId, application: { isNot: null}
			},
		}),

		prisma.jobOffer.count({
			where: {
				userId,
				application: {is: null}
			}
		}),

		prisma.jobOffer.count({
			where: { userId }
		})
	]);

	return {summaryCount, stats: {applied, notApplied}};
}

export async function deleteJobOffers(ids: number[]){
	const result = await prisma.$transaction([
		prisma.application.deleteMany({
			where: {
				jobOfferId: {in: ids}
			}
		}),

		prisma.jobOffer.deleteMany({
			where: {
				id: {in: ids}
			}
		})
	]);

	return result;
}