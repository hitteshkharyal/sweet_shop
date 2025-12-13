import client from "./client";

export const createOrder = data =>
  client.post("/orders", data);

export const getMyOrders = () =>
  client.get("/orders/me");

export const getAllOrders = () =>
  client.get("/orders");
