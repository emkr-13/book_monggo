import { Request, Response } from "express";
import { sendResponse } from "../utils/responseHelper";
import * as authService from "../services/authService";

interface LoginRequestBody {
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginRequestBody = req.body;

    if (!email || !password) {
      sendResponse(res, 400, "Email and password are required");
      return;
    }

    const result = await authService.loginUser(email, password);
    sendResponse(res, 200, "Login successful", result);
  } catch (error: any) {
    console.error("Login error:", error.message);

    if (error.message === "Invalid credentials") {
      sendResponse(res, 401, error.message);
    } else if (error.message === "Token generation failed") {
      sendResponse(res, 500, error.message);
    } else {
      sendResponse(res, 500, "An unexpected error occurred");
    }
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, fullname } = req.body;

    // Basic validation
    if (!email || !password) {
      sendResponse(res, 400, "Email and password are required");
      return;
    }

    // Register user through service
    const newUser = await authService.registerUser(email, password, fullname);

    sendResponse(res, 201, "User registered successfully", {
      id: newUser.id,
      email: newUser.email,
      fullname: newUser.fullname,
    });
  } catch (error: any) {
    console.error("Registration error:", error.message);

    if (error.message === "Email already in use") {
      sendResponse(res, 409, error.message);
    } else {
      sendResponse(res, 500, "Registration failed");
    }
  }
};
