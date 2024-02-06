import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
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
