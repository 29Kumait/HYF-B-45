import express from "express";
import { handleSignUp, handleLogin } from "../controllers/authController.js";

const router = express.Router();

// Routes
router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
export default router;
