import type { Request, Response } from 'express';
import * as applicationsService from '../services/applications.service.js';
import type { RequestQuery } from '../shared/lib/applicationDashboardQueryParser.js';
import * as applicationDashboardQueryParser from '../shared/lib/applicationDashboardQueryParser.js';
import { ApplicationStatus } from '../enums/enums.js';
import type { ApplicationPatchValues } from '../services/applications.service.js';

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

export async function getApplicationById(req: Request, res: Response) {
	try {
		const { id } = req.query as {
			id?: string; 
		}

		if (!id || Number.isNaN(Number(id))) {
			return res.status(400).json({ message: 'Invalid id'});
		}

		const data = await applicationsService.getApplicationById(Number(id));
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
		
		if (!id || Number.isNaN(Number(id))) {
			return res.status(400).json({ message: 'Invalid id'});
		}

		if (typeof comment !== 'string') {
			return res.status(400).json({ message: 'Invalid comment' });
		}

		const result = await applicationsService.patchApplication(id, {comment});

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

type updateApplicationBody = {
	id: number;
	status: string;
	nextStepDate?: string;
	comment?: string;
}
export async function updateApplication(req: Request<{}, {}, updateApplicationBody>, res: Response) {
	try {
		const { 
			id,
			status,
			nextStepDate,
			comment
		} = req.body as {
			id: number,
			status: string,
			nextStepDate?: string,
			comment?: string
		}

		if (!id || Number.isNaN(Number(id))) {
			return res.status(400).json({ message: 'Invalid id'});
		}

		const values: ApplicationPatchValues = {};

		if (!Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
			return res.status(400).json({ message: 'Invalid application status' });
		}
		values.status = status as ApplicationStatus;

		
			values.nextStepDate =	nextStepDate ? new Date(nextStepDate) : null;
			if (values.nextStepDate && Number.isNaN(values.nextStepDate.getTime())) {
				return res.status(400).json({ message: 'Invalid next step date' });
			}	

			
		values.comment = comment ?? null;

		if (values.comment && values.comment.length > 500) {
			return res.status(400).json({message: 'Invalid comment'});
		}

		const result = await applicationsService.patchApplication(id, values);
		return res.status(201).json(result);


	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}

export async function apply(req: Request, res: Response) {
	try {
		const { id } = req.query as {
			id?: string; 
		}

		if (!id || Number.isNaN(Number(id))) {
			return res.status(400).json({ message: 'Invalid id' });
		}

		const result = await applicationsService.apply(Number(id));

		if (result === 'offer_not_found') {
			return res.status(404).json({
				message: "Offer not found"
			});
		}

		if (result === 'application already exists') {
			return res.status(409).json({
				message: "Application already exists"
			});
		}

		return res.status(200).json(result);

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