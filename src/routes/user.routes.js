import express from 'express';
import {
  accountStatus,
  getAllUsers,
  getProfile,
  login,
  logout,
  signup,
  updatePassword,
  updateUser,
} from '../controllers/user.controller';
import validateRegister from '../validations/user/signup.validation';
import {
  CheckLoginPassword,
  checkIfUserExists,
  checkUserApproved,
  checkValidOldPassword,
  getUserByEmail,
  uploadAvatar,
} from '../middlewares/user.middlewares';
import validateLogin from '../validations/user/login.validation';
import { protectRoute, restrictTo } from '../middlewares/auth.middleware';

const userRoutes = express.Router();
userRoutes.post('/register', validateRegister, checkIfUserExists, signup);
userRoutes.post(
  '/login',
  validateLogin,
  getUserByEmail,
  CheckLoginPassword,
  checkUserApproved,
  login
);
userRoutes.get('/profile', protectRoute, getProfile);
userRoutes.get('/logout', protectRoute, logout);
userRoutes.get('/', protectRoute, restrictTo('Super Admin'), getAllUsers);
userRoutes.put('/disable-enable/:id', protectRoute, accountStatus);
userRoutes.put('/:id', protectRoute, uploadAvatar, updateUser);
userRoutes.patch(
  '/change-password',
  protectRoute,
  checkValidOldPassword,
  updatePassword
);

export default userRoutes;
