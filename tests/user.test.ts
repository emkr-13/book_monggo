import request from "supertest";
import app from "../src/server";
import { getAuthToken } from "./test-utils";

describe("User API", () => {
  let token: string;

  beforeAll(async () => {
    token = await getAuthToken();
  });

  describe("GET /api/users/detail", () => {
    it("should get user profile", async () => {
      const response = await request(app)
        .get("/api/users/detail")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.data).toHaveProperty("email");
    });
  });
});
