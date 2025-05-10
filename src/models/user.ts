import { Schema, model, Document } from "mongoose";

// Define the interface
interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  fullname?: string;
  refreshToken?: string;
  refreshTokenExp?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// Define the schema
const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: () => require("uuid").v4(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
    fullname: {
      type: String,
      maxlength: 255,
    },
    refreshToken: {
      type: String,
      maxlength: 255,
    },
    refreshTokenExp: Date,
    deletedAt: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Create the model
const User = model<IUser>("User", userSchema, "users");

// Export both the model and interface
export { User, IUser };