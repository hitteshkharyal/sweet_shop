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
describe("Sweets - Create", () => {
  it("should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Gulab Jamun");
  });
});
describe("Sweets - Search", () => {
  it("should search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Gulab")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
describe("Sweets - Update", () => {
  it("should update sweet details", async () => {
    const sweet = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 5,
        quantity: 20
      });

    const res = await request(app)
      .put(`/api/sweets/${sweet.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 8 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(8);
  });
});
let adminToken;

beforeAll(async () => {
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "admin123"
  });

  await User.findOneAndUpdate(
    { email: "admin@test.com" },
    { role: "admin" }
  );

  const res = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "admin123"
  });

  adminToken = res.body.token;
});

describe("Sweets - Delete (Admin)", () => {
  it("should delete sweet if admin", async () => {
    const sweet = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 12,
        quantity: 10
      });

    const res = await request(app)
      .delete(`/api/sweets/${sweet.body._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});


describe("Inventory - Purchase", () => {
  it("should reduce quantity when purchased", async () => {
    const sweet = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Peda",
        category: "Indian",
        price: 15,
        quantity: 5
      });

    const res = await request(app)
      .post(`/api/sweets/${sweet.body._id}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ qty: 2 });

    expect(res.body.quantity).toBe(3);
  });
});
