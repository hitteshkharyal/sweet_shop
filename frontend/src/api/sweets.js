import client from "./client";

export const getSweets = () => client.get("/sweets");
export const createSweet = data => client.post("/sweets", data);
export const purchaseSweet = (id, qty) =>
  client.post(`/sweets/${id}/purchase`, { qty });
