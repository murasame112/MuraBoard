import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';
import * as userEndpoints from './endpoints/userEndpoints.js';
import * as jobEndpoints from './endpoints/jobEndpoints.js';
import cors from 'cors';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });


const app = express();

app.use(express.json());

app.use(cors());

// === health ===
app.get('/api/health', (req, res) => {
	res.json({status: 'ok', message: 'api is running'});
});

// === test data ===

app.post('/api/generate-test-data', jobEndpoints.generateTestData);

// === user ===
app.post('/api/user/create', userEndpoints.createUser);

// === companies ===
app.get('/api/joboffer/companies', jobEndpoints.getCompanies);
app.get('/api/joboffer/company/:id', jobEndpoints.getCompanyById);
app.post('/api/joboffer/company', jobEndpoints.createCompany);

// === job offers ===
app.get('/api/joboffer/offers-for-user/:id' /* TODO: < this is just for development purposes */ , jobEndpoints.getJobOffersForUser);
app.get('/api/joboffer/offers-for-dashboard/:id' /* TODO: < this is just for development purposes */ , jobEndpoints.getJobOffersForDashboard);
app.post('/api/joboffer/create', jobEndpoints.createJobOffer);
app.delete('/api/joboffer/delete-many', jobEndpoints.deleteJobOffersByIds);

// === applications ===
app.get('/api/joboffer/applications-for-user', jobEndpoints.getApplicationsForUser);
app.get('/api/joboffer/applications-for-offer/:id', jobEndpoints.getApplicationsForJobOffer);
app.post('/api/joboffer/apply', jobEndpoints.applyToJobOffer);
app.patch('/api/joboffer/application', jobEndpoints.patchApplication);



app.listen(process.env.PORT, () => {
	console.log(`server on: http://localhost:${process.env.PORT}`);
})