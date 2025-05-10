import { Request, Response } from "express";
import { sendResponse } from "../utils/responseHelper";
import * as userService from "../services/userService";

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      sendResponse(res, 400, "Unauthorized");
      return;
    }

    const { fullname } = req.body;
    await userService.updateProfile(userId, fullname);
    sendResponse(res, 200, "User updated successfully");
  } catch (error: any) {
    console.error("Error editing user:", error.message);
    const statusCode = error.message === "User not found" ? 404 : 500;
    sendResponse(res, statusCode, error.message);
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      sendResponse(res, 400, "Unauthorized");
      return;
    }

    const userProfile = await userService.getUserProfile(userId);
    sendResponse(res, 200, "User profile retrieved successfully", userProfile);
  } catch (error: any) {
    console.error("Error retrieving profile:", error.message);
    const statusCode = error.message === "User not found" ? 404 : 500;
    sendResponse(res, statusCode, error.message);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      sendResponse(res, 400, "Unauthorized");
      return;
    }

    await userService.logoutUser(userId);
    sendResponse(res, 200, "Logout successful");
  } catch (error: any) {
    console.error("Error during logout:", error.message);
    sendResponse(res, 500, "Logout failed");
  }
};