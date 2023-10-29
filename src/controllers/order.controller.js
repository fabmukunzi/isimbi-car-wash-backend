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

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order retrieved successfully", order });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to create an order",
    });
  }
};

export const getAllOrdersForUser = async (req, res) => {
  try {
    const { clientId } = req.params;
    const orders = await OrderService.getAllOrdersForUser(clientId);
    return res
      .status(200)
      .json({ message: "Order retrieved successfully", orders });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to fetch an order",
    });
  }
};

export const getAllOrdersForWasher = async (req, res) => {
  try {
    const { washerId } = req.params;
    const orders = await OrderService.getAllOrdersForWasher(washerId);
    return res
      .status(200)
      .json({ message: "Order retrieved successfully", orders });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Failed to fetch an order",
    });
  }
};
