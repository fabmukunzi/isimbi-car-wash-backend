import express from "express";
import userRoutes from "./user.routes";
import reportRoutes from "./report.routes";
import analyticsRoutes from "./analytics.routes";
import orderRoutes from "./order.routes";

const routes = express.Router();
routes.use("/users", userRoutes);
routes.use("/reports", reportRoutes);
routes.use("/analytics", analyticsRoutes);
routes.use("/orders", orderRoutes);

export default routes;
