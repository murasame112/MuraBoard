import type { Request, Response } from 'express';
import * as jobOffersService from '../services/jobOffers.service.js';
import type { Currency } from '../enums/enums.js';
import type { Company } from '../models/models.js';

export async function getJobOffersForDashboard(req: Request, res: Response) {
	try {
		const { userId, page, pageSize} = req.query as {
			userId?: string;
			page?: string;
			pageSize?: string;
		}

		if (!userId || Number.isNaN(userId)) {
			return res.status(400).json({ message: 'Invalid user id' });
		}

		if (!page || Number.isNaN(pageSize)) {
			return res.status(400).json({ message: 'Invalid page' });
		}

		if (!page || Number.isNaN(pageSize)) {
			return res.status(400).json({ message: 'Invalid pageSize' });
		}

		const data = await jobOffersService.getJobOffersDashboardData(Number(userId), Number(page), Number(pageSize));
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function getJobOffersCount(req: Request, res: Response) {
	try {
		const { userId } = req.query as {
			userId?: string;
		}

		if (!userId || Number.isNaN(userId)) {
			return res.status(400).json({ message: 'Invalid user id' });
		}

		const data = await jobOffersService.getJobOffersCount(Number(userId));
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function getJobOffersStats(req: Request, res: Response) {
	try {
		const { userId } = req.query as {
			userId?: string;
		}

		if (!userId || Number.isNaN(userId)) {
			return res.status(400).json({ message: 'Invalid user id'});
		}

		const data = await jobOffersService.getJobOffersStats(Number(userId));
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function getJobOfferById(req: Request, res: Response) {
	try {
		const { id } = req.query as {
			id?: string; 
		}

		if (!id || Number.isNaN(id)) {
			return res.status(400).json({ message: 'Invalid id'});
		}

		const data = await jobOffersService.getJobOfferById(Number(id));
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

type UpsertJobOfferBody = {
	id?: number;
	position: string;
	salaryMin?: string;
	salaryMax?: string;
	currency: Currency | string;
	company: Company;
}

export async function upsertJobOffer(req: Request<{}, {}, UpsertJobOfferBody>, res: Response) {
	try {
		const { userId } = req.query as {
			userId?: string;
		}
		
		if (!userId || Number.isNaN(userId)) {
			return res.status(400).json({ message: 'Invalid user id' });
		}

		const { 
			id,
			position,
			salaryMin,
			salaryMax,
			currency,
			company 
		} = req.body as {
			id?: number;
			position: string;
			salaryMin?: string;
			salaryMax?: string;
			currency: Currency | string;
			company: Company;
		};

		if (!position || !company || !currency) {
			return res.status(400).json({message: 'Missing job offer data'});
		}

		if (Number.isNaN(salaryMin)) {
			return res.status(400).json({ message: 'Invalid min salary' });
		}

		if (Number.isNaN(salaryMax)) {
			return res.status(400).json({ message: 'Invalid max salary' });
		}
		
		const result = await jobOffersService.upsertJobOffer(
            Number(userId),
            position,
            company,
            id ?? undefined,
            salaryMin ? Number(salaryMin) : undefined,
            salaryMax ? Number(salaryMax) :  undefined,
						currency === 'unknown' ? undefined : (currency as Currency)
    );
		if (result === 'user_not_found') {
			return res.status(404).json({
				message: "User not found"
			});
		}

		return res.status(201).json(result);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

type DeleteJobOfferBody = {
	ids: number[];
}
export async function deleteJobOffers(req: Request<{}, {}, DeleteJobOfferBody>, res: Response) {
	try {
		const { ids } = req.body as {
			ids: number[];
		};

		if (!ids || ids.length === 0) {
			return res.status(400).json({ message: 'Invalid ids'});
		}

		await jobOffersService.deleteJobOffers(ids);

		return res.status(204).end();
	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}