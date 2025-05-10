import { generateJwtToken, generateRefreshToken } from "../utils/helper";
import * as userRepository from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import { IUser } from "../models/user";

interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  // Find user
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate tokens
  const jwtResponse = await generateJwtToken({ id: user._id });
  const refreshTokenResponse = await generateRefreshToken({ id: user._id });

  if (!jwtResponse.token || !refreshTokenResponse.token) {
    throw new Error("Token generation failed");
  }

  const authToken = jwtResponse.token;
  const refreshToken = refreshTokenResponse.token;
  const refreshTokenExp = new Date(
    Date.now() + parseInt(process.env.REFRESH_TOKEN_EXP || "0") * 1000
  );

  // Update refresh token
  await userRepository.updateUserRefreshToken(
    user._id,
    refreshToken,
    refreshTokenExp
  );

  return {
    token: authToken,
    refreshToken,
  };
};

// Add more service methods as needed