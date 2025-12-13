process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email: "user@test.com",
    password: "password123"
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "user@test.com",
    password: "password123"
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweets - Protected Routes", () => {
  it("should block access without token", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(401);
  });
});
