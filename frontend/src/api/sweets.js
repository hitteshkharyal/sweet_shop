import client from "./client";

export const getSweets = () => client.get("/sweets");

export const createSweet = data =>
  client.post("/sweets", data);

export const updateSweet = (id, data) =>
  client.put(`/sweets/${id}`, data);

export const deleteSweet = id =>
  client.delete(`/sweets/${id}`);

export const purchaseSweet = (id, qty) =>
  client.post(`/sweets/${id}/purchase`, { qty });

export const restockSweet = (id, qty) =>
  client.post(`/sweets/${id}/restock`, { qty });
