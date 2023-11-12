import { Order } from "../database/models/index.js";

export class OrderService {
  static async createOrder(order) {
    return Order.create(order);
  }

  static async getOrderById(id) {
    return Order.findByPk(id);
  }

  static async getOrdersByColumn(column, value) {
    return Order.findAll({
      order: [["createdAt", "DESC"]],
      where: { [column]: value },
    });
  }

  static async updateOrder(id, updates) {
    return Order.update(updates, { where: { id } });
  }
}
