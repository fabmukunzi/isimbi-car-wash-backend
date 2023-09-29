import express from 'express';
import { getProfile, login, signup } from '../controllers/user.controller';
import validateRegister from '../validations/user/signup.validation';
import {
  checkIfUserExists,
  getUserByEmail,
} from '../middlewares/user.middlewares';
import validateLogin from '../validations/user/login.validation';
import { protectRoute } from '../middlewares/auth.middleware';

const userRoutes = express.Router();
userRoutes.post('/register', validateRegister, checkIfUserExists, signup);
userRoutes.post('/login', validateLogin, getUserByEmail, login);
userRoutes.get('/profile',protectRoute,getProfile)

export default userRoutes;
