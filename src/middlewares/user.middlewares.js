import { User } from '../database/models/index.js';
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
