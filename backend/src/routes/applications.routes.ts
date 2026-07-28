import { Router } from "express";
import * as applicationsController from '../controllers/applications.controller.js';
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

router.get('/', applicationsController.getApplications);
router.get('/applications-count', applicationsController.getApplicationsCount);
router.get('/applications-stats', applicationsController.getApplicationsStats);
router.get('/:id', applicationsController.getApplicationById);
router.post('/applications-apply', applicationsController.apply);
router.patch('/applications-edit-comment', applicationsController.editApplicationComment);
router.patch('/applications-update', applicationsController.updateApplication);
router.delete('/applications-delete', applicationsController.deleteApplications);

export default router;