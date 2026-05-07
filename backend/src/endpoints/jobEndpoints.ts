import type { Request, Response } from 'express';
import {prisma} from '../index.js';
import { ApplicationStatus, Prisma } from '../generated/prisma/index.js';

const userId = 4; // FIXME: this shouldn't be hardcoded later on

// ========= Companies =========

export async function getCompanies(req: Request, res: Response){
	try {
		const result = await prisma.company.findMany();
		return res.status(200).json(result);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

// ========= Job Offers =========

export async function getJobOffersForUser(req: Request, res: Response){
	try {
		const result = await prisma.$transaction(async (tx) => {

			const user = await tx.user.findUnique({
				where: {id: userId}
			});
			
			if (!user) {
				return 'user_not_found';
			}

			const jobOffers = await tx.jobOffer.findMany({
				where: {userId: user.id}
			});

			if (!jobOffers) {
				return 'joboffers_not_found';
			}

			return jobOffers;

		});

		if (result === 'user_not_found') {
			return res.status(404).json({ message: 'user not found' });
		}

		if (result === 'joboffers_not_found') { 
			return res.status(200).json([]);
		}

		return res.status(200).json(result);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}

}


type createJobOfferBody = {
	title: string;
	salaryMin: number | undefined;
	salaryMax: number | undefined;
	createdAt: Date;
	companyId: number | undefined;
	companyName: string | undefined;
	companyLocation: string | undefined;
	companyWebsite: string | undefined;
}

export async function createJobOffer(req: Request<{}, {}, createJobOfferBody>, res: Response){
	try {
		
		const {
					title,
					salaryMin,
					salaryMax,
					createdAt,
					companyId,
					companyName,
					companyLocation,
					companyWebsite,
			} = req.body;

		

		if (!title || !createdAt) {
			return res.status(400).json({message: 'missing job offer data'});
		}

		const result = await prisma.$transaction(async (tx) => {
			let company;
			if (companyId) {
				company = await tx.company.findUnique({
					where: {id: companyId}
				});

				if (!company) {
					return 'company_not_found';
				}
			} else {

				if (!companyName || !companyLocation) {
					return 'missing_company_data'
				}

				company = await tx.company.create({
					data: {
						name: companyName!,
						location: companyLocation!,
						website: companyWebsite ?? null,
					}
				})
			}
			
			const user = await tx.user.findUnique({
				where: {id: userId}
			});

			if (!user) {
				return 'user_not_found';
			}

			const jobOffer = await tx.jobOffer.create({
				data: {
					title,
					salaryMin: salaryMin ?? null,
					salaryMax: salaryMax ?? null,
					createdAt,
					company: {
						connect: {id: company.id}
					},
					user: {
						connect: {id: user.id}
					}
				}
			});
			return jobOffer;
		});

		if (result === 'company_not_found') {
			return res.status(404).json({
				message: "company not found"
			});
		}

		if (result === 'missing_company_data') {
			return res.status(400).json({
				message: "companyName and companyLoaction aren't provided"
			});
		}

		if (result === 'user_not_found') {
			return res.status(404).json({
				message: "user not found"
			});
		}

		return res.status(201).json(result);

	} catch (error){
		return res.status(500).json({message: 'Something went wrong'});
	}

}

// ========= Applications =========

export async function getApplicationsForUser(req: Request, res: Response){
	try {
		const result = await prisma.$transaction(async (tx) => {

			const user = await tx.user.findUnique({
				where: {id: userId}
			});
			
			if (!user) {
				return 'user_not_found';
			}

			const applications = await tx.application.findMany({
				where: {userId: user.id}
			});

			if (!applications) {
				return 'applications_not_found';
			}

			return applications;

		});

		if (result === 'user_not_found') {
			return res.status(404).json({ message: 'user not found' });
		}

		if (result === 'applications_not_found') { 
			return res.status(200).json([]);
		}

		return res.status(200).json(result);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}

}


type applyToJobOfferBody = {
	jobOfferId: number;
}


export async function applyToJobOffer(req: Request<{}, {}, applyToJobOfferBody>, res: Response){
		try {
			const {jobOfferId} = req.body;
			
			if (!jobOfferId) {
				return res.status(400).json({ message: 'missing job offer data' });
			}

			const result = await prisma.$transaction(async (tx) => {

				const user = await tx.user.findUnique({
					where: {id: userId}
				});

				if (!user) {
					return 'user_not_found';
				}

				const jobOffer = await tx.jobOffer.findUnique({
					where: {id: jobOfferId}
				});

				if (!jobOffer) {
					return 'joboffer_not_found';
				}

				const existingApplication = await tx.application.findFirst({
					where: {
						userId: user.id,
						jobOfferId: jobOffer.id
					}
				});

				if (existingApplication) {
					return 'application_already_exists';
				}

				const application = await tx.application.create({
					data: {
						status: ApplicationStatus.APPLIED,
						user: {
							connect: {id: user.id}
						},
						jobOffer: {
							connect: {id: jobOfferId}
						}
					}
				});

				return application;
			
			});

			if (result === 'user_not_found') {
				return res.status(404).json({ message: 'user not found' });
			}

			if (result === 'joboffer_not_found') {
				return res.status(404).json({ message: 'job offer not found' });
			}

			if (result === 'application_already_exists') {
				return res.status(409).json({ message: 'application already exists' });
			}

			return res.status(201).json(result);

		} catch (error){
			return res.status(500).json({message: 'Something went wrong'});
		}

}

type PatchApplicationBody = {
	id: number;
	status?: ApplicationStatus;
	nextStepDate?: Date | null;
	comment?: string | null;
}

export async function patchApplication(req: Request<{}, {}, PatchApplicationBody>, res: Response){
	try {
		const { id, status, nextStepDate, comment } = req.body;

		if (!id) {
			return res.status(400).json({ message: 'missing id data' });
		}

		const data: Prisma.ApplicationUpdateInput = {};

		if (status !== undefined) data.status = status;
		if (nextStepDate !== undefined) data.nextStepDate = nextStepDate;
		if (comment !== undefined) data.comment = comment;
		
		if (Object.keys(data).length === 0) {
			return res.status(400).json({message: 'no fields to update'});
		}

		const updated = await prisma.application.update({
			where: {id: id},
			data
		});

		return res.status(200).json(updated);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}