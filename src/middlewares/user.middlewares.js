import { User } from '../database/models/index.js';
import { BcryptUtility } from '../utils/bcrypt.util.js';
export const checkIfUserExists = async (req, res, next) => {
  const { email } = req.body;
  const userInDb = await User.findOne({
    where: { email: email },
  });
  if (userInDb) {
    return res
      .status(409)
      .json({ message: 'User with email already registered' });
  }
  next();
};

export const getUserByEmail = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: 'User not found, try again' });
  }
  req.user = user;
  next();
};

export const checkUserApproved = async (req, res, next) => {
  const user = req.user;
  if (!user.isApproved) {
    return res.status(409).json({ message: 'This account is not approved' });
  }
  next();
};

export const CheckLoginPassword = async (req, res, next) => {
  const { password } = req.body;
  const user = req.user;
  const isValidPassword = await BcryptUtility.verifyPassword(
    password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(409).json({ message: 'Invalid password, try again.' });
  }
  next();
};