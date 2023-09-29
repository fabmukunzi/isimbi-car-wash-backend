import { UserService } from '../services/user.service';

export const signup = async (req, res) => {
  try {
    await UserService.register(req.body);
    res.send('registered');
  } catch (error) {
    console.log(error);
  }
};
