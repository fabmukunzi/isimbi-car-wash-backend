import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../utils/constants';
// import { isAuthRevoked } from '../utils/logout.util.js';

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    let authToken = req.header('Authorization') || '';
    let token = authToken.split(' ')[1];
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'Unauthorized request, try again' });
      } else if (tokenBlacklist.includes(authToken)) {
        return res
          .status(401)
          .json({ message: 'Unauthorized request, try again' });
      } else {
        req.user = user;
        req.token = token;
        next();
      }
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: 'Something went wrong, try again' });
  }
};
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You are not allowed to perform this task',
      });
    }
    next();
  };
};
