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

type UpsertCompanyBody = {
	name: string;
	location: string;
	website?: string;
}
export async function upsertCompany(req: Request<{}, {}, UpsertCompanyBody>, res: Response) {
	console.log('called -------------------------------------');
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

		const args: [string, string, URL?] = [name, location];
		if (website) args.push(website);

		const data = await companiesService.upsertCompany(...args);

		return res.status(201).json(data);

	} catch (error) {
		return res.status(500).json({message: 'Something went wrong'});
	}
}