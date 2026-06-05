import { Router } from "express";
import * as jobOffersController from '../controllers/jobOffers.controller.js';

const router = Router();

router.get('/offers-for-dashboard', jobOffersController.getJobOffersForDashboard);
router.get('/offers-count', jobOffersController.getJobOffersCount);
router.get('/offers-stats', jobOffersController.getJobOffersStats);

export default router;