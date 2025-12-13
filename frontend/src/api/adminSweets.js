import client from "./client";

export const getAllSweets = () => client.get("/sweets");

export const addSweet = data => client.post("/sweets", data);

export const updateSweet = (id, data) =>
  client.put(`/sweets/${id}`, data);

export const deleteSweet = id =>
  client.delete(`/sweets/${id}`);

export const restockSweet = (id, qty) =>
  client.post(`/sweets/${id}/restock`, { qty });
