import type { Request, Response } from 'express';
import * as applicationsService from '../services/applications.service.js';

export async function getApplicationsForDashboard(req: Request, res: Response) {
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

		const data = await applicationsService.getApplicationsDashboardData(Number(userId), Number(page), Number(pageSize));
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function getApplicationsCount(req: Request, res: Response) {
	try {
		const { userId } = req.query as {
			userId?: string;
		}

		if (!userId || Number.isNaN(userId)) {
			return res.status(400).json({ message: 'Invalid user id' });
		}

		const data = applicationsService.getApplicationsCount(Number(userId));

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}