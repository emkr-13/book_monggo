import { Request, Response } from "express";
import User from "../models/user";
import { sendResponse } from "../utils/responseHelper";

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ambil user ID dari token yang sudah diverifikasi
    const userId = (req as any).user.id;

    if (!userId) {
      sendResponse(res, 400, "Unauthorized");
    }

    // Ambil data dari request body
    const { fullname } = req.body;

    // Validasi input
    if (!fullname) {
      sendResponse(res, 400, "fullname is required");
    }

    // Update user di database
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { fullname },
      { new: true } // Mengembalikan dokumen yang telah diperbarui
    );

    // Jika user tidak ditemukan
    if (!updatedUser) {
      sendResponse(res, 404, "User not found");
    }

    // Kirim response sukses
    sendResponse(res, 200, "User updated successfully");
  } catch (error) {
    console.error("Error editing user:", error);
    sendResponse(res, 500, "Internal server error");
  }
};
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Ambil user ID dari token yang sudah diverifikasi
    const userId = (req as any).user.id;

    if (!userId) {
      sendResponse(res, 400, "Unauthorized");
    }

    // Cari user berdasarkan ID
    const user = await User.findById(userId);

    // Jika user tidak ditemukan
    if (!user) {
      sendResponse(res, 404, "User not found");
    }

    // Buat objek data user yang akan dikirimkan
    const dataUser = {
      email: user.email,
      fullname: user.fullname,
      usercreated: user.createdAt,
    };

    // Kirim response dengan data user
    sendResponse(res, 200, "User profile retrieved successfully", dataUser);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    sendResponse(res, 500, "Internal server error");
  }
};
