import { prisma } from '../db/prisma.js';
import { Prisma, ApplicationStatus } from '../generated/prisma/client.js';
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
			jobOffer: {
				include: {
					company: true,
				},
			}
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

type ApplicationPatchValues = {
	status?: ApplicationStatus;
	nextStepDate?: Date | null;
	comment?: string | null;
};
export async function patchApplication(id: number, values: ApplicationPatchValues ) {

	const data: Prisma.ApplicationUpdateInput = {
		...(values.status !== undefined && { status: values.status }),
		...(values.nextStepDate !== undefined && { nextStepDate: values.nextStepDate }),
		...(values.comment !== undefined && { comment: values.comment })
	};

	return prisma.application.update({
		where: { id },
		data,
	});
}

export async function apply(id: number) {
	const offer = await prisma.jobOffer.findUnique({
		where: {id: id}
	});

	if (!offer) {
		return 'offer_not_found';
	};

	const existingApplication = await prisma.application.findUnique({
		where: {jobOfferId: id}
	});

	if (existingApplication) {
		return 'application already exists';
	}

	const result = prisma.application.create({
		data: {
			jobOfferId: id,
			userId: 4, //TODO: userId shouldn't be 4, it's just for development
			status: 'APPLIED'
		}
	});
	return result;
}

export async function deleteApplications(ids: number[]) {
	const result = await prisma.application.deleteMany({
			where: {
				id: {in: ids}
			}
		});

	return result;
}