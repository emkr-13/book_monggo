import mongoose from "mongoose";
import { connectToDatabase } from "./src/config/db";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});