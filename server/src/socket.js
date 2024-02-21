import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { logInfo } from "./util/logging.js";
import formatMessage from "./util/formatMessage.js";

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
    // Handle chat messages
    socket.on("chat message", (message) => {
      // Format the message
      const formattedMessage = formatMessage(message.userName, message.text);

      // Broadcast the formatted message to all connected clients
      io.emit("chat message", formattedMessage);
    });
    socket.emit("try", formatMessage("user", "message"));
    socket.broadcast.emit("try", "A user has connected");

    // Handle disconnects
    socket.on("disconnect", () => {
      logInfo("A user has disconnected");
      // Handle user disconnect
    });
  });

  return io;
};

export default initializeSocketIO;
