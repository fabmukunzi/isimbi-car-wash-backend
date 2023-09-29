import { User } from '../database/models/index.js';

export class UserService {
  static async register(user) {
    return User.create(user);
  }
}
