import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

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

app.post('/api/addtestdata', async (req, res) => {
	console.log(process.env.DATABASE_URL);
	console.log();
	const test = await prisma.test.create({
		data: {
			name: "Anna"
		}
	})
	console.log(test);
	res.json({status: 'ok', message: JSON.stringify(test)});
});

app.listen(PORT, () => {
	console.log(`server on: http://localhost:${PORT}`);
})