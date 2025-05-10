import request from "supertest";
import app from "../src/server"; // Import Express app
import User from "../src/models/user";
import bcrypt from "bcryptjs";

describe("POST /api/auth/login", () => {
  let token: string;

  beforeAll(async () => {
    // Seed user data for testing
    await User.deleteMany();
    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({
      email: "testuser@mail.com",
      password: hashedPassword,
    });
  });

  afterAll(async () => {
    // Clean up database after tests
    await User.deleteMany();
  });

  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@mail.com",
        password: "password123",
      })
      .expect(200);

    expect(response.body).toHaveProperty("token");
    token = response.body.token; // Save token for other tests
  });

  it("should fail with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@mail.com",
        password: "wrongpassword",
      })
      .expect(401);

    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should fail with missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({})
      .expect(400);

    expect(response.body.message).toBe("email and password are required");
  });
});
