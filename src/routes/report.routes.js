import express from 'express';
import {
  expenseReport,
  getExpenses,
  getIncomes,
  incomeReport,
  report,
} from '../controllers/report.controller';
import { protectRoute } from '../middlewares/auth.middleware';
import { uploadImages } from '../middlewares/report.middleware';
import {
  validateReports,
  validateIncome,
} from '../validations/report/reports.validation';

const reportRoutes = express.Router();
reportRoutes.post(
  '/expenses',
  protectRoute,
  validateReports,
  uploadImages,
  expenseReport
);
reportRoutes.post(
  '/incomes',
  protectRoute,
  validateIncome,
  uploadImages,
  incomeReport
);
reportRoutes.get('/expenses', getExpenses);
reportRoutes.get('/incomes', getIncomes);

export default reportRoutes;
