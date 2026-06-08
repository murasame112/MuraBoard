import { Router } from 'express';
import * as companiesController from '../controllers/companies.controller.js';

const router = Router();

router.get('/companies', companiesController.getCompanies);

export default router;