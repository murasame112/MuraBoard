import type { Request, Response } from "express";
import * as companiesService from '../services/companies.service.js';

export async function getCompanies(req: Request, res: Response) {
	try {
		const data = await companiesService.getCompanies();
		return res.status(200).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}