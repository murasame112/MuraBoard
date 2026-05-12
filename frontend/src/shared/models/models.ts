import { ApplicationStatus } from "../enums/enums";

export type JobOffer = {
	id: number;
	title: string;
	salaryMin?: number;
	salaryMax?: number;
	currency: string;
	createdAt: Date;
	companyName: string;
	companyLocation: string;
	companyWebsite?: string;
	status: ApplicationStatus;
}