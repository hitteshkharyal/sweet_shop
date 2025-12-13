const request = require("supertest");
const app = require("../server");

// mock User model BEFORE importing it anywhere else
jest.mock("../models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

const User = require("../models/User");

describe("Auth - Register", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      name: "Test User",
      email: "test@example.com"
    });
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });
});
