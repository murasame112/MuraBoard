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

		const data = await applicationsService.getApplicationsCount(query);
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

type editApplicationCommentBody = {
	id: number;
	comment: string;
}
export async function editApplicationComment(req: Request<{}, {}, editApplicationCommentBody>, res: Response){
	try {
		const { 
			id,
			comment
		} = req.body as {
			id: number;
			comment: string;
		};

		if (!id || !comment) {
			return res.status(400).json({ message: 'Invalid data' });
		}

		const result = await applicationsService.patchApplication(id, {comment});

		return res.status(201).json(result)
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