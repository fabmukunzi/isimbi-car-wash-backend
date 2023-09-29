import { UserService } from '../services/user.service';
import { BcryptUtility } from '../utils/bcrypt.util';
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
    const { id, firstname, email, avatar, role } = req.user;
    const userData = {
      id,
      firstname,
      email,
      avatar,
      role,
    };
    const token = JwtUtility.generateToken(userData, '1h');
    return res.status(200).json({
      token: token,
      user:userData,
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
