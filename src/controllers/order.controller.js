import { OrderService } from "../services/order.service";

export const createOrder = async (req, res) => {
  try {
    const { user } = req;
    const {
      scheduledTime,
      address,
      carPlate,
      serviceType,
      price,
      time,
      carModel,
    } = req.body;
    const order = {
      customerId: user.id,
      scheduledTime,
      carPlate,
      serviceType,
      price,
      carModel,
      time,
      address: JSON.stringify(address),
    };

    const newOrder = await OrderService.createOrder(order);
    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to create an order",
    });
  }
};
