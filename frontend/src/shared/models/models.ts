import { ApplicationStatus } from "../enums/enums";

export type JobOffer = {
	id: number;
	position: string;
	salaryMin?: number | null;
	salaryMax?: number | null;
	currency: string;
	createdAt: Date;
	company: Company;
	application: {
		status: ApplicationStatus | null;
	};
}

export type Company = {
	id: number;
	name: string;
	location: string;
	website?: string | null;
}