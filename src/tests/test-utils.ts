import mongoose from "mongoose";
import request from "supertest";
import app from "../server";
import { createUser, deleteAllUsers } from "../repositories/userRepository";
import { generateJwtToken } from "../utils/helper";

// Test user data
export const TEST_USER = {
  email: "test@example.com",
  password: "password123",
  fullname: "Test User",
};

// Initialize test environment
export const initializeTestEnv = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI_TEST || "mongodb://localhost:27017/book_test"
  );
  await deleteAllUsers();
  await createUser(TEST_USER);
};

// Clean up test environment
export const cleanupTestEnv = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

// Generate auth token for testing
export const getTestToken = async () => {
  const token = await generateJwtToken({ id: "test-user-id" });
  return `Bearer ${token}`;
};

// Test client helper
export const testClient = request(app);