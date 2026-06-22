import { prisma } from '../db/prisma.js';
import type { ParsedQuery } from '../shared/lib/applicationDashboardQueryParser.js';
import { buildApplicationWhere } from '../shared/lib/buildApplicationWhere.js';

export async function getApplicationsDashboardData(query: ParsedQuery) {
	const {
		currentPage,
		pageSize
	} = query

	const where = buildApplicationWhere(query);
	const applications = await prisma.application.findMany({
		where,
		orderBy: {appliedAt: 'desc'},
		skip: (currentPage - 1) * pageSize,
		take: pageSize,
		include: {
			jobOffer: true
		}
	});

	return applications;
}

export async function getApplicationsCount(query: ParsedQuery) { 
	const where = buildApplicationWhere(query);
	const count = await prisma.application.count({
		where
	});
	return count;
}

export async function getApplicationsStats(query: ParsedQuery) {
	const where = buildApplicationWhere(query);
	const [
		applied,
		inProgress,
		interview,
		offer,
		rejected,
		summaryCount
	] = await prisma.$transaction([

		prisma.application.count({
			where: { status: 'APPLIED', ...where }
		}),

		prisma.application.count({
			where: { status: 'IN_PROGRESS', ...where }
		}),

		prisma.application.count({
			where: { status: 'INTERVIEW', ...where }
		}),

		prisma.application.count({
			where: { status: 'OFFER', ...where }
		}),

		prisma.application.count({
			where: { status: 'REJECTED', ...where }
		}),

		prisma.application.count({where})
	]);

	return {summaryCount, stats: {applied, inProgress, interview, offer, rejected}};

}

export async function deleteApplications(ids: number[]){
	const result = await prisma.application.deleteMany({
			where: {
				id: {in: ids}
			}
		});

	return result;
}