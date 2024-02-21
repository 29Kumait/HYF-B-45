// socket.js

import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { logInfo } from "./util/logging.js";
import { formatMessage } from "./util/formatMessage.js";

dotenv.config();

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.BASE_CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logInfo("A user has connected");
    // Handle joining a chat room
    socket.on("joinRoom", (itemId) => {
      const roomName = `room-${itemId}`;
      socket.join(roomName); // Join the chat room
      logInfo(`A user has connected to room: ${roomName}`);
    });

    // Handle chat messages
    socket.on("chat message", (message) => {
      logInfo("Received chat message:", message.text);

      // Format the message
      const formattedMessage = formatMessage(message.userName, message.text);
      logInfo("Formatted message:", formattedMessage);

      // Broadcast the formatted message to all users in the room
      io.to(message.room).emit("chat message", formattedMessage);
      logInfo(`Broadcasted message to room: ${message.room}`);
    });

    // Handle disconnects
    socket.on("disconnect", () => {
      logInfo("A user has disconnected");
      // Handle user disconnect
    });
  });

  return io;
};

export default initializeSocketIO;
