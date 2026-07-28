import { Router } from "express";
import * as jobOffersController from '../controllers/jobOffers.controller.js';
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

router.get('/', jobOffersController.getJobOffers);
router.get('/count', jobOffersController.getJobOffersCount);
router.get('/stats', jobOffersController.getJobOffersStats);
router.get('/:id', jobOffersController.getJobOfferById);
router.post('/', jobOffersController.createJobOffer);
router.put('/:id', jobOffersController.updateJobOffer);
router.delete('/', jobOffersController.deleteJobOffers);

export default router;