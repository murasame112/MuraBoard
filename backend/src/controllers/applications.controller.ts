import type { Request, Response } from 'express';
import * as applicationsService from '../services/applications.service.js';
import type { RequestQuery } from '../shared/lib/applicationDashboardQueryParser.js';
import * as applicationDashboardQueryParser from '../shared/lib/applicationDashboardQueryParser.js';

export async function getApplicationsForDashboard(req: Request<{}, {}, {}, RequestQuery>, res: Response) {
	try {
		const query = applicationDashboardQueryParser.parse(req.query);

		if (!query.ok) {
			return res.status(400).json({message: query.error});
		}

		const data = await applicationsService.getApplicationsDashboardData(query);
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function getApplicationsCount(req: Request<{}, {}, {}, RequestQuery>, res: Response) {
	try {
		const query = applicationDashboardQueryParser.parse(req.query);

		if (!query.ok) {
			return res.status(400).json({message: query.error});
		}

		const data = applicationsService.getApplicationsCount(query);
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function getApplicationsStats(req: Request<{}, {}, {}, RequestQuery>, res: Response) {
	try {
		const query = applicationDashboardQueryParser.parse(req.query);

		if (!query.ok) {
			return res.status(400).json({message: query.error});
		}

		const data = await applicationsService.getApplicationsStats(query);
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

type DeleteApplicationBody = {
	ids: number[];
}
export async function deleteApplications(req: Request<{}, {}, DeleteApplicationBody>, res: Response) {
	try {
		const { ids } = req.body as {
			ids: number[];
		};

		if (!ids || ids.length === 0) {
			return res.status(400).json({ message: 'Invalid ids'});
		}

		await applicationsService.deleteApplications(ids);

		return res.status(204).end();
	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}