import { Router } from "express";
import * as jobOffersController from '../controllers/jobOffers.controller.js';

const router = Router();

router.get('/offers-for-dashboard', jobOffersController.getJobOffersForDashboard);
router.get('/offers-count', jobOffersController.getJobOffersCount);
router.get('/offers-stats', jobOffersController.getJobOffersStats);
router.get('/offers-by-id', jobOffersController.getJobOfferById);
router.post('/offers-insert', jobOffersController.upsertJobOffer);
router.put('/offers-update', jobOffersController.upsertJobOffer);
router.delete('/offers-delete', jobOffersController.deleteJobOffers);

export default router;