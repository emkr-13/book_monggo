import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => require("uuid").v4(), // generate UUID v4
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: Date,
  },
  {
    versionKey: false, // disable __v
    timestamps: true, // auto manage createdAt & updatedAt
  }
);

// Jika ingin mengganti nama collection di DB
export default model("User", userSchema, "users");
