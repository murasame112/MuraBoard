export type JobOffer = {
	id: number;
	companyId: number;
	//userId: number;
	title: string;
	salaryMin?: number;
	salaryMax?: number;
	createdAt: Date;
}