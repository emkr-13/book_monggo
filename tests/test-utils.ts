import request from "supertest";
import app from "../src/server";
import { TEST_USER } from "./test-constants";

export const getAuthToken = async () => {
  const response = await request(app).post("/api/auth/login").send(TEST_USER);

  return response.body.token;
};
