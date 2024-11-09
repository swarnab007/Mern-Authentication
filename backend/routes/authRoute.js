import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/profile", (req, res) => {
  res.send("Profile");
});

router.get("/logout", (req, res) => {
  res.send("Logout");
});

export default router;
