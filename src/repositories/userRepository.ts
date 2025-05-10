import { User, IUser } from "../models/user";

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
    deletedAt: { $exists: false },
  }).exec();
};

export const updateUserRefreshToken = async (
  userId: string,
  refreshToken: string,
  refreshTokenExp: Date
): Promise<void> => {
  await User.updateOne(
    { _id: userId },
    {
      refreshToken,
      refreshTokenExp,
      updatedAt: new Date(),
    }
  );
};

export const findUserById = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId).exec();
};

export const updateUserProfile = async (
  userId: string,
  updateData: { fullname?: string }
): Promise<IUser | null> => {
  return User.findOneAndUpdate({ _id: userId }, updateData, {
    new: true,
  }).exec();
};

export const clearRefreshToken = async (userId: string): Promise<void> => {
  await User.updateOne(
    { _id: userId },
    {
      refreshToken: null,
      refreshTokenExp: null,
    }
  ).exec();
};
