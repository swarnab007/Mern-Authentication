import { User } from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetSuccessEmail,
  sendResetPasswordEmail,
  sendVerifyEmail,
  sendWelcomeEmail,
} from "../nodemailer/emails.js";

dotenv.config("./.env");

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verifyPasswordToken = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verifyPasswordToken,
      verifyPasswordExpire: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();
    generateTokenAndSetCookie(res, user._id);
    // send verify Email
    await sendVerifyEmail(user.email, user.verifyPasswordToken);

    console.log(user);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: null },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// verify code
export const verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verifyPasswordToken: code,
      verifyPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.isVerified = true;
    user.lastLoginAt = Date.now();
    user.verifyPasswordToken = undefined;
    user.verifyPasswordExpire = undefined;

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User verified successfully" });

    sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// login
export const login = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // find user in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    // check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "User is not verified" });
    }

    user.lastLoginAt = Date.now();
    await user.save();
    generateTokenAndSetCookie(res, user._id);
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

// forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordExpire = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = token;
    await user.save();

    sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${token}`
    );
    res.status(200).json({ success: true, message: "Reset link sent" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user by reset password token and check if token is not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    // If user not found or token expired
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendPasswordResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
