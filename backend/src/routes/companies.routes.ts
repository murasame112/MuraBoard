import { Router } from 'express';
import * as companiesController from '../controllers/companies.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', companiesController.getCompanies);
router.post('/companies-upsert', companiesController.upsertCompany);

export default router;