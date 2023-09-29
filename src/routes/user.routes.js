import express from 'express';
import { signup } from '../controllers/user.controller';
import validateRegister from '../validations/user/signup.validation';

const userRoutes = express.Router();
userRoutes.post('/register',validateRegister, signup);

export default userRoutes;
