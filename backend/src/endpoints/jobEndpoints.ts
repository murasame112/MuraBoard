import type { Request, Response } from 'express';
import {prisma} from '../index.js';
import { ApplicationStatus, Prisma, UserRole } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';
import { companiesSeed, jobOffersSeed, applicationsSeed } from './testData.js';

const userId = 4; // FIXME: this shouldn't be hardcoded later on



export async function generateTestData(req: Request, res: Response) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { id: 4 },
        update: {},
        create: {
          id: 4,
          email: 'initial@email.com',
          name: 'initial',
					role: UserRole.ADMIN,
          passwordHash: await bcrypt.hash('initial', 10),
        },
      });

      await tx.application.deleteMany({});
      await tx.jobOffer.deleteMany({});
      await tx.company.deleteMany({});

      await tx.company.createMany({
        data: companiesSeed,
      });

      const companiesFromDb = await tx.company.findMany({
        select: { id: true, name: true },
      });

      const companyMap = new Map(
        companiesFromDb.map((company) => [company.name, company.id]),
      );

      const parsedJobOffers = jobOffersSeed.map((offer) => {
        const companyId = companyMap.get(offer.companyName);
        if (!companyId) {
          throw new Error(`Missing company: ${offer.companyName}`);
        }

        return {
          title: offer.title,
          salaryMin: offer.salaryMin,
          salaryMax: offer.salaryMax,
          createdAt: offer.createdAt,
          userId: user.id,
          companyId,
        };
      });

      await tx.jobOffer.createMany({
        data: parsedJobOffers,
      });

      const jobOffersFromDb = await tx.jobOffer.findMany({
        select: { id: true, title: true },
      });

      const jobOfferMap = new Map(
        jobOffersFromDb.map((jobOffer) => [jobOffer.title, jobOffer.id]),
      );

      const parsedApplications = applicationsSeed.map((application) => {
        const jobOfferId = jobOfferMap.get(application.jobOfferTitle);
        if (!jobOfferId) {
          throw new Error(`Missing job offer: ${application.jobOfferTitle}`);
        }

        return {
          userId: user.id,
          jobOfferId,
          status: application.status,
          nextStepDate: application.nextStepDate,
          comment: application.comment,
        };
      });

      await tx.application.createMany({
        data: parsedApplications,
      });

      return {
        userId: user.id,
        companies: parsedJobOffers.length,
        jobOffers: parsedJobOffers.length,
        applications: parsedApplications.length,
      };
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

// ========= Companies =========

export async function getCompanies(req: Request, res: Response){
	try {
		const result = await prisma.company.findMany();
		return res.status(200).json(result);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function getCompanyById(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);

		if (Number.isNaN(id)) {
			return res.status(400).json({ message: 'Invalid id' });
		}
		const result = await prisma.company.findUnique({
			where: {id: id}
		});
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

type createCompanyBody = {
	name: string;
	location: string;
	website?: string;
}

export async function createCompany(req: Request<{}, {}, createCompanyBody>, res: Response) {
	try {
		const name = req.body.name.trim();
		const location = req.body.location.trim();
		const website = req.body.website ? new URL('https://' + req.body.website.trim()) : null;

		if (!name || name.length === 0) {
			return res.status(400).json({ message: 'No company name provided' });
		}

		if (name.length < 5) {
			return res.status(400).json({ message: 'Company name is too short' });
		}

		if (name.length > 80) {
			return res.status(400).json({ message: 'Company name is too long' });
		}

		
		if (!location || location.length === 0) {
			return res.status(400).json({ message: 'No company location provided' });
		}
			
		if (location.length < 3) {
			return res.status(400).json({ message: 'Company location is too short' });
		}

		if (location.length > 254) {
			return res.status(400).json({ message: 'Company location is too long' });
		}

		if (website && website.hostname.length < 5) {
			return res.status(400).json({ message: 'Company website is too short' });
		}

		if (website && website.hostname.length > 254) {
			return res.status(400).json({ message: 'Company website is too long' });
		}
		
		if (website && !website.hostname.includes('.')) {
			return res.status(400).json({ message: 'Company website is invalid' });
		}
				
		if (website && website.protocol !== 'https:') {
			return res.status(400).json({ message: 'Company website is invalid' });
		}



		const company = await prisma.company.create({
			data: {
				name: name,
				location: location,
				website: website ? website.protocol + '//' + website.hostname : null
			}
		});

		return res.status(201).json(company);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

// ========= Job Offers =========

//TODO: do i need this?
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

export async function getJobOffersForDashboard(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);

		if (Number.isNaN(id)) {
			return res.status(400).json({ message: 'Invalid id' });
		}

		const result = await prisma.$transaction(async (tx) => {
			const offers = await tx.jobOffer.findMany({
				where: {userId: id},
				include: {application: true, company: true}
			});

			if (!offers) return res.status(200).json([]);

			const {applied, notApplied} = offers.reduce(
				(accumulator, offer) => {
					if (offer.application) accumulator.applied += 1;
					else accumulator.notApplied += 1;

					return accumulator;
				},
				{applied: 0, notApplied: 0}
			);

			return res.status(200).json({
				offers,
				stats: {
					applied,
					notApplied,
				},
			});

		})

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

type DeleteJobOfferBody = {
	ids: number[];
}

export async function deleteJobOffersByIds(req: Request<{}, {}, DeleteJobOfferBody>, res: Response) {
	try {
		const {ids} = req.body;

		const deleteApplications = prisma.application.deleteMany({
			where: {
				jobOfferId: {in: ids}
			}
		});

		const deleteJobOffers = prisma.jobOffer.deleteMany({
			where: {
				id: {in: ids}
			}
		});

		const result = await prisma.$transaction([deleteApplications, deleteJobOffers]);
		return res.status(200).json(result);

	} catch (error) {
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

export async function getApplicationsForJobOffer(req: Request, res: Response) {
	try {
		const id = Number(req.params.id);

		if (Number.isNaN(id)) {
			return res.status(400).json({ message: 'Invalid id' });
		}
		
		const result = await prisma.application.findUnique({
			where: {jobOfferId: id}
		})
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