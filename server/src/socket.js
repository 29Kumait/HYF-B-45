import { Server as SocketIOServer } from "socket.io";
import { logInfo, logError } from "./util/logging.js";
import { authenticateToken } from "./service/jwtChat.js";

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  let users = {};

  io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    try {
      const user = authenticateToken(token);
      if (!user) throw new Error("Authentication failed.");
      users[user.id] = { socketId: socket.id, username: user.username };
      logInfo(`User ${user.username} connected with socket ${socket.id}`);
    } catch (error) {
      logError(`Authentication error: ${error.message}`);
      socket.disconnect(true);
      return;
    }
    socket.on("chat message", ({ recipientId, msg }) => {
      try {
        const userId = Object.keys(users).find(
          (key) => users[key].socketId === socket.id
        );
        if (!userId) throw new Error("User not found or not authenticated");

        const user = users[userId];
        const recipientSocketId = users[recipientId]?.socketId;
        if (!recipientSocketId) throw new Error("Recipient not connected.");

        io.to(recipientSocketId).emit("chat message", {
          from: user.username,
          message: msg,
        });
      } catch (error) {
        logError(`Chat message error: ${error.message}`);
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("disconnect", () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        logInfo(`User ID ${userId} disconnected`);
        delete users[userId];
      }
    });
  });

  return io;
};

export default initializeSocketIO;
