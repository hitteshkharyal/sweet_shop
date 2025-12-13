import client from "./client";

export const register = (data) => {
  return client.post("/auth/register", data);
};

export const login = (data) => {
  return client.post("/auth/login", data);
};
