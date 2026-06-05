import { Router } from "express";
import * as applicationsController from '../controllers/applications.controller.js';

const router = Router();

router.get('/applications-for-dashboard', applicationsController.getApplicationsForDashboard);
router.get('/applications-count', applicationsController.getApplicationsCount);
router.get('/applications-stats', applicationsController.getApplicationsStats);

export default router;