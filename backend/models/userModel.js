import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // googleId: { type: String, unique: true, sparse: true }, // Only for Google users
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date, default: Date.now },
    // photo: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verifyPasswordToken: String,
    verifyPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
