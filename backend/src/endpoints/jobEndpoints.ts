import type { Request, Response } from 'express';
import {prisma} from '../index.js';

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

		const userId = 4; // FIXME: this shouldn't be hardcoded later on

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
			})
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

export async function applyToJobOffer(req: Request, res: Response){

}