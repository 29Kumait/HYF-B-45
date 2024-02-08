import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { logError, logInfo } from "../util/logging.js";

const createUser = async (userData) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      logInfo("User with this email already exists:", existingUser);

      throw new Error("User with this email already exists");
    }

    // No duplicate email, proceed to create a new user
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    logError("Error creating user:", error);
    throw error;
  }
};

const findUserByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (user && (await user.comparePassword(password))) {
    return user;
  }
  return null;
};

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

export { createUser, findUserByCredentials, generateAuthToken };
