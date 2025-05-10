import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { deleteAllUsers, createMultipleUsers } from "../repositories/userRepository";

const seedUsers = async () => {
  try {
    // 1. Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/book"
      );
      console.log("Connected to MongoDB");
    }

    // 2. Hapus semua user yang ada
    await deleteAllUsers();
    console.log("Deleted all existing users");

    // 3. Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // 4. Data user yang akan di-seed
    const usersToSeed = [
      {
        email: "admin@mail.com",
        fullname: "Admin",
        password: hashedPassword,
      },
      {
        email: "user@mail.com",
        fullname: "Regular User",
        password: hashedPassword,
      },
    ];

    // 5. Buat user baru
    const createdUsers = await createMultipleUsers(usersToSeed);
    console.log(`Successfully seeded ${createdUsers.length} users`);

    return createdUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  } finally {
    // 6. Tutup koneksi
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Jalankan jika file di-execute langsung
if (require.main === module) {
  seedUsers()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seedUsers;