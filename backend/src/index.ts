import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';
import * as userEndpoints from './endpoints/userEndpoints.js';
import * as jobEndpoints from './endpoints/jobEndpoints.js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });


const app = express();

app.use(express.json());

// === health ===
app.get('/api/health', (req, res) => {
	res.json({status: 'ok', message: 'api is running'});
});

// === user ===
app.post('/api/user/create', userEndpoints.createUser);

// === companies ===
app.get('/api/joboffer/companies', jobEndpoints.getCompanies);

// === job offers ===
app.get('/api/joboffer/offers-for-user', jobEndpoints.getJobOffersForUser);
app.post('/api/joboffer/create', jobEndpoints.createJobOffer);

// === applications ===
app.get('/api/joboffer/applications-for-user', jobEndpoints.getApplicationsForUser);
app.post('/api/joboffer/apply', jobEndpoints.applyToJobOffer);
app.patch('/api/joboffer/application', jobEndpoints.patchApplication);



app.listen(process.env.PORT, () => {
	console.log(`server on: http://localhost:${process.env.PORT}`);
})