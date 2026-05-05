import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';
import * as userEndpoints from './endpoints/userEndpoints.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });


const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
	res.json({status: 'ok', message: 'api is running'});
});

app.post('/api/user/create', userEndpoints.createUser);

app.listen(PORT, () => {
	console.log(`server on: http://localhost:${PORT}`);
})