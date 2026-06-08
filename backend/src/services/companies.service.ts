import { prisma } from "../db/prisma.js";

export async function getCompanies(){
	const companies = prisma.company.findMany();	

	return companies;
}