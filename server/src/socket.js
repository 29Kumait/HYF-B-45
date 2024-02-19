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
  let missedMessages = {};

  io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    try {
      const user = authenticateToken(token);
      if (!user) throw new Error("Authentication failed.");
      users[user.id] = { socketId: socket.id, username: user.username };
      logInfo(`User ${user.username} connected with socket ${socket.id}`);

      if (missedMessages[user.id] && missedMessages[user.id].length > 0) {
        socket.emit("missed messages", missedMessages[user.id]);
        delete missedMessages[user.id];
      }

      socket.on("chat message", ({ recipientId, msg }) => {
        const recipientSocketId = users[recipientId]?.socketId;
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("chat message", {
            from: users[socket.id].username,
            message: msg,
          });
        } else {
          missedMessages[recipientId] = missedMessages[recipientId] || [];
          missedMessages[recipientId].push({
            from: users[socket.id].username,
            message: msg,
          });
          logInfo(
            `Message stored for ${recipientId} from ${
              users[socket.id].username
            }`
          );
        }
      });
    } catch (error) {
      logError(`Authentication error: ${error.message}`);
      socket.disconnect(true);
      return;
    }

    socket.on("disconnect", () => {
      const userId = Object.keys(users).find(
        (key) => users[key].socketId === socket.id
      );
      if (userId) {
        logInfo(`User ${users[userId].username} disconnected`);
        delete users[userId];
      }
    });
  });

  return io;
};

export default initializeSocketIO;
