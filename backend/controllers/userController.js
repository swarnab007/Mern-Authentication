import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { verifyEmail } from "../mailtrap/emails.js";

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
    await verifyEmail(user.email, user.verifyPasswordToken);

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

// login
