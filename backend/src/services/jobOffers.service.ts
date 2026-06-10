import { connect } from 'node:http2';
import { prisma } from '../db/prisma.js';
import type { Currency } from '../enums/enums.js';
import type { Company } from '../models/models.js';

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
	return count;
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

export async function getJobOfferById(id: number) { 
	const result = await prisma.jobOffer.findFirst({
		where: { id },
		include: {
			company: true,
			application: false
		}
	});
	return result;
}

export async function upsertJobOffer(userId: number, position: string, company: Company, id?: number, salaryMin?: number, salaryMax?: number, currency?: Currency ) {
	const result = await prisma.$transaction(async (tx) => {
		const user = await tx.user.findUnique({
			where: { id: userId }
		});

		if (!user) {
			return 'user_not_found';
		}

		if (!id) {
			const jobOffer = await tx.jobOffer.create({
				data: {
					position,
					salaryMin: salaryMin ?? null,
					salaryMax: salaryMax ?? null,
					currency: currency ?? null,
					company: {
						connect: { id: company.id }
					},
					user: {
						connect: { id: user.id }
					}
				}
			});
			return jobOffer;
		} else {
			const jobOffer = await tx.jobOffer.update({
				where: { id },
				data: {
					position,
					salaryMin: salaryMin ?? null,
					salaryMax: salaryMax ?? null,
					currency: currency ?? null,
					company: {
						connect: { id: company.id }
					},
					user: {
						connect: { id: user.id }
					}		
				}
			});
			return jobOffer;
		}

	});
	return result;

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