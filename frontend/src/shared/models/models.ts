import { ApplicationStatus } from "../enums/enums";

export type JobOffer = {
	id: number;
	title: string;
	salaryMin?: number;
	salaryMax?: number;
	currency: string;
	createdAt: Date;
	company: {
		name: string;
		location: string;
		website?: string;
	};
	application: {
		status: ApplicationStatus | null;
	};
}