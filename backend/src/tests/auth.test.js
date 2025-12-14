const request = require("supertest");
const app = require("../server");

describe("API Basic Test", () => {
  it("GET / should return running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Sweet Shop API is running...");
  });
});
