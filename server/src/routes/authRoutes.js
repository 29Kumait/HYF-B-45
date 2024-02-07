import express from "express";
import {
  createUser,
  findUserByCredentials,
  generateAuthToken,
} from "../service/loginSignUp.js";

const router = express.Router();

// Sing-Up Handler
const handleSignUp = async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
    if (!user) {
      return res.status(400).send("Failed to create user");
    }
    const token = generateAuthToken(user._id);
    res.status(201).send({ token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// Login Handler
const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByCredentials(username, password);
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    const token = generateAuthToken(user._id);
    res.send({ token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// Routes
router.post("/sign-up", handleSignUp);
router.post("/login", handleLogin);

export default router;
