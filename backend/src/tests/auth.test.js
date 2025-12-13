// 1️⃣ Force test environment
process.env.NODE_ENV = "test";
require("dotenv").config({ path: ".env.test" });

// 2️⃣ Imports
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");

// 3️⃣ Database lifecycle hooks (THIS IS WHAT YOU ASKED)
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

// 4️⃣ Tests
describe("Auth - Register", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });
});

describe("Auth - Login", () => {
  it("should login an existing user and return token", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email: "login@test.com",
      password: "password123"
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@test.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should fail for wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "login@test.com",
      password: "wrongpassword"
    });

    expect(res.statusCode).toBe(401);
  });
});
