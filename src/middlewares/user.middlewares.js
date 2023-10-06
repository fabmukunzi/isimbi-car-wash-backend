import { User } from '../database/models/index.js';
import { BcryptUtility } from '../utils/bcrypt.util.js';
import { uploadPhoto } from '../utils/upload.js';
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
  if (user?.role === 'Admin' && !user.isApproved) {
    return res.status(409).json({ message: 'This account is not Enabled' });
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

export const uploadAvatar = async (req, res, next) => {
  let { avatar } = req.files||{};
  if (avatar) {
    const { url } = await uploadPhoto(req, res, avatar);
    req.body.avatar = url;
  }
  next();
};
export const checkValidOldPassword = async (req, res, next) => {
  const { old_password } = req.body;
  const user = await User.findByPk(req.user.id);
  const isValidPassword = await BcryptUtility.verifyPassword(
    old_password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(409).json({ message: 'Incorrect old password' });
  }
  next();
};
