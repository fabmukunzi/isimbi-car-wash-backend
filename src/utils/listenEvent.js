import { knownEvents, subscribe } from "./events.util";
import { orderQueue } from "../queues/order.queue";

export const listenOrderCreated = subscribe(
  knownEvents.orderCreated,
  async (orderId) => {
    console.log(`New order created with ID ${orderId}:`);
    await orderQueue.add(
      { orderId },
      {
        delay: process.env.ORDER_ASSIGN_DELAY_TIME,
        attempts: 3,
      }
    );
  }
);
