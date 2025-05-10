import * as userRepository from "../repositories/userRepository";
import { IUser } from "../models/user";

export const getUserProfile = async (userId: string) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    email: user.email,
    fullname: user.fullname,
    usercreated: user.createdAt,
  };
};

export const updateProfile = async (
  userId: string,
  fullname: string
): Promise<IUser> => {
  if (!fullname) {
    throw new Error("Fullname is required");
  }

  const updatedUser = await userRepository.updateUserProfile(userId, {
    fullname,
  });
  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

export const logoutUser = async (userId: string): Promise<void> => {
  await userRepository.clearRefreshToken(userId);
};
