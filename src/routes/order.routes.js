import express from "express";
import {
  createOrder,
  getAllOrdersForUser,
  getAllOrdersForWasher,
  getSingleOrder,
} from "../controllers/order.controller";
import { protectRoute } from "../middlewares/auth.middleware";
import { validateOrder } from "../validations/order/order.validation";

const orderRoutes = express.Router();

orderRoutes.post("/", protectRoute, validateOrder, createOrder);
orderRoutes.get("/:id", protectRoute, getSingleOrder);
orderRoutes.get("/client/:clientId", protectRoute, getAllOrdersForUser);
orderRoutes.get("/washer/:washerId", protectRoute, getAllOrdersForWasher);

export default orderRoutes;
