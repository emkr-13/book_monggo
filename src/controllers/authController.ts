import { Request, Response } from "express";
import { sendResponse } from "../utils/responseHelper";
import { generateJwtToken, generateRefreshToken } from "../utils/helper";
import User from "../models/user";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validasi input
    const { email, password } = req.body;

    if (!email || !password) {
      sendResponse(res, 400, "email and password are required");
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });

    // Jika user tidak ditemukan
    if (!user) {
      sendResponse(res, 401, "Invalid credentials");
    }
    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      sendResponse(res, 401, "Invalid credentials");
    }

    // Generate token
    let authToken: string, refreshToken: string | undefined;

    try {
      const jwtResponse = await generateJwtToken({ id: user._id });
      authToken = jwtResponse.token ?? "";
      const refreshTokenResponse = await generateRefreshToken({ id: user._id });
      refreshToken = refreshTokenResponse.token ?? "";
      if (!refreshToken) {
        throw new Error("Refresh token generation failed");
      }
    } catch (error) {
      console.error("JWT generation failed:", error);
      sendResponse(res, 501, "Token generation failed");
    }

    // Update refresh token di database
    try {
      await User.updateOne(
        { _id: user._id },
        {
          refreshToken,
          refreshTokenExp: new Date(
            Date.now() + parseInt(process.env.REFRESH_TOKEN_EXP!) * 1000
          ),
        }
      );
    } catch (dbError) {
      console.error("Database update failed:", dbError);
      sendResponse(res, 500, "Failed to update refresh token");
    }

    sendResponse(res, 200, "Login successful", {
      token: authToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Unexpected error during login:", error);
    sendResponse(res, 500, "An unexpected error occurred", error);
  }
};

