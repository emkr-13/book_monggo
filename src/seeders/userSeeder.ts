import mongoose from "mongoose";
import User from "../models/user";
import bcrypt from "bcryptjs";

export const seedUsers = async () => {
  try {
    // Pastikan terhubung ke MongoDB
    if (mongoose.connection.readyState !== 1) {
      // 1 = CONNECTED
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/book"
      );
      console.log("Connected to MongoDB");
    }

    // Hapus semua data pengguna sebelum menambahkan data baru
    await User.deleteMany();

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Tambahkan data pengguna
    const users = [
      {
        email: "admin@mail.com",
        fullname: "admin",
        password: hashedPassword,
      },
      {
        email: "user@mail.com",
        fullname: "user",
        password: hashedPassword,
      },
    ];

    await User.insertMany(users);

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Tutup koneksi setelah selesai
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// ✅ Jalankan fungsi jika file di-run langsung dengan ts-node
if (require.main === module) {
  seedUsers();
}
