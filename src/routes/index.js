import express from 'express';
import userRoutes from './user.routes';

const routes = express.Router();
routes.use('/users', userRoutes);

export default routes;
