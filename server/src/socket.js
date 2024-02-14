import { Server as SocketIOServer } from "socket.io";
import { logInfo } from "./util/logging.js";

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Handle joining a specific one-to-one chat
    socket.on("join chat", (chatId) => {
      socket.join(chatId);
      logInfo(`User ${socket.id} joined chat ${chatId}`);
    });

    // Handle one-to-one chat message
    socket.on("chat message", ({ chatId, msg }) => {
      // Broadcast the message only to the other participant in the chat
      socket.to(chatId).emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      logInfo(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default initializeSocketIO;
