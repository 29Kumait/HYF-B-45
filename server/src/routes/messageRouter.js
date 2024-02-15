import express from "express";
import { Message } from "../models/Message.js";
import User from "../models/User.js";
import { verifyToken } from "../service/verifyToken.js";

const messageRouter = express.Router();

// Middleware to check if users exist based on URL parameters
const checkUsersExistForGet = async (req, res, next) => {
  try {
    const { userId, otherUserId } = req.params;
    const userExists = await User.countDocuments({
      _id: { $in: [userId, otherUserId] },
    });
    if (userExists !== 2) {
      // Expecting two unique users
      return res.status(404).json({ message: "One or both users not found." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to check if users exist for POST requests
const checkUsersExist = async (req, res, next) => {
  try {
    const { sender, recipient } = req.body;
    const userExists = await User.countDocuments({
      _id: { $in: [sender, recipient] },
    });
    if (userExists !== 2) {
      // Expecting two unique users
      return res.status(404).json({ message: "One or both users not found." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch messages for a chat
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId, recipient: req.params.otherUserId },
        { sender: req.params.otherUserId, recipient: req.params.userId },
      ],
    })
      .populate("sender", "username userImageURL")
      .sort("-timestamp");
    if (messages.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for this chat" });
    }
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post a new message
const postMessage = async (req, res) => {
  const { sender, recipient, content } = req.body;

  if (!sender || !recipient || !content) {
    return res
      .status(400)
      .json({ message: "Missing required fields: sender, recipient, content" });
  }

  const message = new Message({ sender, recipient, content });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

messageRouter.get(
  "/:userId/:otherUserId",
  verifyToken,
  checkUsersExistForGet,
  getMessages
);
messageRouter.post("/", verifyToken, checkUsersExist, postMessage);

export default messageRouter;
