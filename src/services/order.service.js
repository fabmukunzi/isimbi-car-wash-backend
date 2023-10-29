import { Order } from "../database/models/index.js";

export class OrderService {
  static async createOrder(order) {
    return Order.create(order);
  }

  static async getOrderById(id) {
    return Order.findByPk(id);
  }

  static async getAllOrdersForUser(userId) {
    return Order.findAll({
      // order: [["createdAt", "DESC"]],
      where: { customerId: userId },
    });
  }

  static async getAllOrdersForWasher(userId) {
    return Order.findAll({
      where: { washerId: userId },
    });
  }
}
