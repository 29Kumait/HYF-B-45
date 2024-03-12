// routes/message.js

import express from "express";
import {
  createMessage,
  getMessagesByRoom,
  deleteMessageHandler,
  deleteAllmessages,
} from "../controllers/message.js";

const messageRouter = express.Router();

// Route to create a new message
messageRouter.post("/", createMessage);

// Route to get all messages for a room
messageRouter.get("/:room", getMessagesByRoom);

// Route to delete an individual message
messageRouter.delete("/:messageId", deleteMessageHandler);

// Route to delete all messages
messageRouter.delete("/delete", deleteAllmessages);

export default messageRouter;
