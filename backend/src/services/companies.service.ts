import { prisma } from "../db/prisma.js";

export async function getCompanies() {
	const companies = prisma.company.findMany();	

	return companies;
}

export async function upsertCompany(name: string, location: string, website?: URL) {
	const company = await prisma.company.upsert({
		where: {
			name
		},
		update: {},
		create: {
			name,
			location,
			website: website ? `${website.protocol}//${website.hostname}` : null 
		}
	});

	return company;
}