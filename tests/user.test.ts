import request from "supertest";
import app from "../src/server";
import User from "../src/models/user";
import bcrypt from "bcryptjs";

describe("GET /api/users/profile", () => {
  let token: string;

  beforeAll(async () => {
    // Seed user and login to get token
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
      email: "testuser@mail.com",
      password: hashedPassword,
    });

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "testuser@mail.com",
      password: "password123",
    });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await User.deleteMany();
  });

  it("should retrieve user profile successfully", async () => {
    const response = await request(app)
      .get("/api/users/detail")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.data).toHaveProperty("username", "testuser");
  });

  it("should fail without token", async () => {
    const response = await request(app).get("/api/users/detail").expect(401);

    expect(response.body.message).toBe("Unauthorized");
  });
});
