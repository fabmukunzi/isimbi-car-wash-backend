import { User } from '../database/models/index.js';
import { BcryptUtility } from '../utils/bcrypt.util.js';
import { JwtUtility } from '../utils/jwt.util.js';
import { uploadPhoto } from '../utils/upload.js';
export const checkIfUserExists = async (req, res, next) => {
  const { email } = req.body || req.user;
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

export const checkIfGUserExists = async (req, res, next) => {
  const email = req.user.email;
  const userInDb = await User.findOne({
    where: { email: email },
  });
  if (userInDb) {
    const {
      id,
      firstname,
      lastname,
      createdAt,
      email,
      phone,
      isApproved,
      avatar,
      role,
    } = userInDb;
    const userData = {
      id,
      firstname,
      lastname,
      email,
      isApproved,
      avatar,
      phone,
      role,
      createdAt,
    };
    const token = JwtUtility.generateToken(userData, '1y');
    return res.redirect(
      `${process.env.REDIRECT_URL}/?token=${token}&user=${JSON.stringify(userData)}`
    );
  }
  next();
};

export const getUserByEmail = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: 'You don\'t have an account, Please signup' });
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
  if (!user.password)
    return res.status(400).json({ message: 'You should use google login' });
  else {
    const isValidPassword = await BcryptUtility.verifyPassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(409).json({ message: 'Invalid password, try again.' });
    }
  }
  next();
};

export const uploadAvatar = async (req, res, next) => {
  let { avatar } = req.files || {};
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
