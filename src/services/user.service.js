import { User } from '../database/models/index.js';

export class UserService {
  static async register(user) {
    return User.create(user);
  }
  static async getUserById(id) {
    return User.findByPk(id);
  }
  static async getUsers() {
    return User.findAll();
  }
  static async updateUser(fields, id) {
    return await User.update({ ...fields }, { where: { id: id } });
  }
}
