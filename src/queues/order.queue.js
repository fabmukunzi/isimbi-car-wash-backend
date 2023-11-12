import Queue from "bull";
import { User } from "../database/models/index.js";
import { OrderService } from "../services/order.service.js";

const orderQueue = new Queue("order:assign", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

orderQueue.process(async (job, done) => {
  console.log(`Processing job ${job.id}`);
  console.log("order:", job.data.orderId);

  const orderId = job.data.orderId;

  const order = await OrderService.getOrderById(orderId);

  if (!order) return done(new Error("Order not found"));
  if (order.status !== "pending")
    return done(new Error("Order is not pending"));

  const availableWasher = await User.findOne({
    where: { role: "washer" },
  });

  if (!availableWasher) return done(new Error("No available washer"));
  // TODO: if there is no available washer, we should re-queue this job until there is one  available washer or the order is cancelled

  await OrderService.updateOrder(orderId, {
    status: "completed",
    washerId: availableWasher.id,
  });

  console.log(`Order ${orderId} assigned to washer ${availableWasher.id}`);

  done();
});

export { orderQueue };
