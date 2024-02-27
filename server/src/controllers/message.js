import Message from "../models/Message.js";
import { logError } from "../util/logging.js";

// Controller function to create a new message
export const createMessage = async (message) => {
  try {
    const { userName, text, pic, room, time } = message;
    const newMessage = new Message({ userName, text, pic, room, time });
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    logError(error);
    throw new Error("Error saving message");
  }
};

// Controller function to get all messages for a room
export const getMessagesByRoom = async (room) => {
  try {
    const messages = await Message.find({ room });
    return messages;
  } catch (error) {
    logError("Error retrieving messages:", error);
    return []; // Return an empty array or handle the error as needed
  }
};

// * delete a message by ID socket.io
export const deleteMessageById = async (messageId) => {
  try {
    const deleteResult = await Message.deleteOne({ _id: messageId });
    if (deleteResult.deletedCount === 0) {
      throw new Error("Message not found");
    }
    return true;
  } catch (error) {
    logError("Error deleting message:", error);
    throw error;
  }
};

// * delete a message by ID  using Express.js for HTTP
export const deleteMessageHandler = async (req, res) => {
  try {
    await deleteMessageById(req.params.messageId);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};


export const deleteAllmessages = async (req, res) => {
  try {
    // Delete all documents from the Message collection
    await Message.deleteMany({});
    res.status(200).json({ message: "Collection cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
