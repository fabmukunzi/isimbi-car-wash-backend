import express from 'express';
import {
  accountStatus,
  getAllUsers,
  getProfile,
  googleAuth,
  googleAuthLogin,
  login,
  logout,
  signup,
  updatePassword,
  updateUser,
} from '../controllers/user.controller';
import validateRegister from '../validations/user/signup.validation';
import {
  CheckLoginPassword,
  checkIfGUserExists,
  checkIfUserExists,
  checkUserApproved,
  checkValidOldPassword,
  getUserByEmail,
  uploadAvatar,
} from '../middlewares/user.middlewares';
import validateLogin from '../validations/user/login.validation';
import {
  googlePass,
  protectRoute,
  restrictTo,
} from '../middlewares/auth.middleware';
import passport from 'passport';

const userRoutes = express.Router();
googlePass();
userRoutes.post('/register', validateRegister, checkIfUserExists, signup);
userRoutes.post(
  '/login',
  validateLogin,
  getUserByEmail,
  CheckLoginPassword,
  checkUserApproved,
  login
);
userRoutes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

userRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  checkIfGUserExists,
  googleAuth
);

userRoutes.get('/profile', protectRoute, getProfile);
userRoutes.get('/auth/google', googleAuth);
userRoutes.get('/logout', protectRoute, logout);
userRoutes.get('/', protectRoute, getAllUsers);
userRoutes.put('/disable-enable/:id', protectRoute, accountStatus);
userRoutes.put('/', protectRoute, uploadAvatar, updateUser);
userRoutes.patch(
  '/change-password',
  protectRoute,
  checkValidOldPassword,
  updatePassword
);

export default userRoutes;
