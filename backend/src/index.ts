import express from 'express';
import 'dotenv/config';
import jobOffersRouter from './routes/jobOffers.routes.js';
import applicationsRouter from './routes/applications.routes.js';
import companiesRouter from './routes/companies.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(helmet());
app.get('/api/health', (req, res) => {
	res.json({status: 'ok', message: 'api is running'});
});

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many login attempts, please try again later' },
    skipSuccessfulRequests: true,
});

app.use('/api/joboffer', jobOffersRouter);
app.use('/api/application', applicationsRouter);
app.use('/api/company', companiesRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
	console.log(`server on: http://localhost:${process.env.PORT}`);
})