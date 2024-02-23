import Message from "../models/Message.js";

// Controller function to create a new message
export const createMessage = async (message) => {
  try {
    const { userName, text, pic, room, time } = message;
    const newMessage = new Message({ userName, text, pic, room, time });
    const savedMessage = await newMessage.save();
    return savedMessage;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving message");
  }
};

// Controller function to get all messages for a room
export const getMessagesByRoom = async (req, res) => {
  try {
    const room = req.params.room;
    const messages = await Message.find({ room });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteAllmessages = async (req, res) => {
  try {
    // Delete all documents from the Message collection
    await Message.deleteMany({});
    res.status(200).json({ message: "Collection cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
