import request from "supertest";
import app from "../src/server";
import { TEST_USER } from "./test-constants";

describe("Auth API", () => {
  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(TEST_USER)
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });

    it("should fail with invalid password", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: TEST_USER.email,
          password: "wrongpassword"
        })
        .expect(401);

      expect(response.body.message).toBe("Invalid credentials");
    });

  });

});