import request from "supertest";
import app from "../server";
import { getTestToken } from "./test-utils";

describe("Author API", () => {
  let authToken: string;
  let authorId: string;

  beforeAll(async () => {
    authToken = await getTestToken();
  });

  describe("POST /author/create", () => {
    it("should create new author", async () => {
      const res = await request(app)
        .post("/author/create")
        .set("Authorization", authToken)
        .send({
          name: "Test Author",
          biography: "Test Biography",
          nationality: "Test Country",
        });

      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty("id");
      authorId = res.body.data.id;
    });
  });

  describe("GET /author/all", () => {
    it("should get all authors with pagination", async () => {
      const res = await request(app)
        .get("/author/all?page=1&limit=10")
        .set("Authorization", authToken);

      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.pagination).toHaveProperty("total_data");
    });
  });

  describe("GET /author/detail/:id", () => {
    it("should get author details", async () => {
      const res = await request(app)
        .get(`/author/detail/${authorId}`)
        .set("Authorization", authToken);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("id", authorId);
    });
  });
});
