import mongoose from "mongoose";
import "dotenv/config";
import { createAuthors } from "../repositories/authorRepository";
import { createBooks } from "../repositories/bookRepository";
import { faker } from "@faker-js/faker";

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    // Seed authors
    const authors = await createAuthors(
      Array(15)
        .fill(null)
        .map(() => ({
          name: faker.person.fullName(),
          biography: faker.lorem.paragraph(),
          nationality: faker.location.country(),
        }))
    );

    // Seed books
    await createBooks(
      Array(20)
        .fill(null)
        .map(() => ({
          title: faker.lorem.words(3),
          author: faker.helpers.arrayElement(authors).id, // Menggunakan id number
          publishedYear: faker.number.int({ min: 1900, max: 2023 }),
          genre: faker.helpers.arrayElements(
            ["Fiction", "Non-Fiction", "Science", "History"],
            2
          ),
        }))
    );

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
