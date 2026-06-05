import express from 'express';
import 'dotenv/config';
import jobOffersRouter from './routes/jobOffers.routes.js';
import applicationsRouter from './routes/applications.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
	res.json({status: 'ok', message: 'api is running'});
});

app.use('/api/joboffer', jobOffersRouter);
app.use('/api/application', applicationsRouter)

app.listen(process.env.PORT, () => {
	console.log(`server on: http://localhost:${process.env.PORT}`);
})