import express from 'express';
import { analytics } from '../controllers/report.controller';

const analyticsRoutes = express.Router();
analyticsRoutes.get('/', analytics);

export default analyticsRoutes;
