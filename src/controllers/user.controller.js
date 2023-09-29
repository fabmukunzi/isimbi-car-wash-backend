import { UserService } from '../services/user.service';
import { BcryptUtility } from '../utils/bcrypt.util';
import { tokenBlacklist } from '../utils/constants';
import { JwtUtility } from '../utils/jwt.util';

export const signup = async (req, res) => {
  try {
    const user = { ...req.body };
    user.password = await BcryptUtility.hashPassword(req.body.password);
    const result = await UserService.register(user);
    const { id, email, role } = result;
    const userData = { id, email, role };
    const userToken = JwtUtility.generateToken(userData, '1h');
    res
      .status(201)
      .json({ message: 'Registered successfully', token: userToken });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to register a new user',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { id, firstname, lastname, email, isApproved, avatar, role } =
      req.user;
    const userData = {
      id,
      firstname,
      lastname,
      email,
      isApproved,
      avatar,
      role,
    };
    const token = JwtUtility.generateToken(userData, '1h');
    return res.status(200).json({
      token: token,
      user: userData,
      message: 'Login successful',
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Error occurred while signing in, try again',
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to get user profile',
    });
  }
};

export const logout = (req, res) => {
  const token = req.headers.authorization;
  console.log(token)
  if (token) {
    tokenBlacklist.push(token);
  }
  res.status(200).json({ message: 'Logged out successfully' });
};
