import { Order } from "../database/models/index.js";

export class OrderService {
  static async createOrder(order) {
    return Order.create(order);
  }

  static async getOrderById(id) {
    return Order.findByPk(id);
  }
}
