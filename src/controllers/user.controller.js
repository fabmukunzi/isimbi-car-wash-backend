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
    const userToken = JwtUtility.generateToken(userData, '30d');
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
    } = req.user;
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
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to get user profile',
    });
  }
};

export const logout = (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    tokenBlacklist.push(token);
  }
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    const newUsers = users.map((user) => {
      const names = (user.names = user.firstname + ' ' + user.lastname);
      const {
        id,
        firstname,
        lastname,
        createdAt,
        updatedAt,
        email,
        isApproved,
        avatar,
        phone,
        role,
      } = user;
      const newUser = {
        id,
        firstname,
        lastname,
        createdAt,
        updatedAt,
        email,
        isApproved,
        avatar,
        phone,
        role,
        names,
      };
      return newUser;
    });
    res.status(200).json({
      status: 200,
      message: 'All Users retrieved successfully',
      data: newUsers,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: 'Failed to get all users' });
  }
};

export const accountStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const isApproved = req.body.isApproved;
    const fields = { isApproved };
    await UserService.updateUser({ fields }, id);
    if (!isApproved) {
      return res.status(200).json({ message: 'Account is disabled' });
    } else {
      return res.status(200).json({ message: 'Account is enabled' });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Failed to update',
    });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.user;
  try {
    const fields = { ...req.body };
    const user = await UserService.updateUser({ fields }, id);
    return res.status(200).json({ message: 'User Updated Successfully', user });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Failed to update',
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const password = await BcryptUtility.hashPassword(req.body.new_password);
    const fields = { password };
    const result = await UserService.updateUser({ fields }, req.user.id);
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to update the password',
    });
  }
};
