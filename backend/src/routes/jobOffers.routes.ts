import { Router } from "express";
import * as jobOffersController from '../controllers/jobOffers.controller.js';

const router = Router();
router.get('/offers-for-dashboard', jobOffersController.getJobOffersForDashboard);

export default router;