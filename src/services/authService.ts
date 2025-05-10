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

export const registerUser = async (
  email: string,
  password: string,
  fullname?: string
) => {
  // Check if user already exists
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await userRepository.createUser({
    email,
    password: hashedPassword,
    fullname,
  });

  // Return user data without password
  return {
    id: newUser._id,
    email: newUser.email,
    fullname: newUser.fullname,
    createdAt: newUser.createdAt,
  };
};
