import express from "express";
import {
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  verifyCode,
} from "../controllers/userController.js";
import { checkisAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/register", register);

router.post("/verify", verifyCode);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/profile", checkisAuth, getProfile);

export default router;
