import express from 'express';
import { getReports, report } from '../controllers/report.controller';
import { protectRoute } from '../middlewares/auth.middleware';
import { uploadImages } from '../middlewares/report.middleware';
import validateReports from '../validations/report/reports.validation';

const reportRoutes = express.Router();
reportRoutes.post('/', protectRoute, validateReports, uploadImages, report);
reportRoutes.get('/', getReports);

export default reportRoutes;
