import { Server as SocketIOServer } from "socket.io";
import { logInfo, logError } from "./util/logging.js";
import { authenticateToken } from "./service/jwtChat.js";
import User from "./models/User.js";

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.BASE_CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  let users = {};
  let missedMessages = {};

  io.on("connection", async (socket) => {
    const token = socket.handshake.query.token;
    try {
      const decodedUser = authenticateToken(token);
      if (!decodedUser) throw new Error("Authentication failed.");

      const user = await User.findById(decodedUser.id);
      if (!user) throw new Error("User not found.");

      users[user.id] = { socketId: socket.id, username: user.username };
      logInfo(`User ${user.username} connected with socket ${socket.id}`);

      await User.findByIdAndUpdate(user.id, { online: true });

      if (missedMessages[user.id] && missedMessages[user.id].length > 0) {
        socket.emit("missed messages", missedMessages[user.id]);
        delete missedMessages[user.id];
      }

      socket.on("chat message", ({ recipientId, msg }) => {
        const recipientSocketId = users[recipientId]?.socketId;
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("chat message", {
            from: user.username,
            message: msg,
          });
        } else {
          missedMessages[recipientId] = missedMessages[recipientId] || [];
          missedMessages[recipientId].push({
            from: user.username,
            message: msg,
          });
          logInfo(`Message stored for ${recipientId} from ${user.username}`);
        }
      });
    } catch (error) {
      logError(`Authentication error: ${error.message}`);
      socket.disconnect(true);
      return;
    }

    socket.on("disconnect", async () => {
      const userId = Object.keys(users).find(
        (key) => users[key].socketId === socket.id
      );
      if (userId) {
        logInfo(`User ${users[userId].username} disconnected`);
        delete users[userId];

        await User.findByIdAndUpdate(userId, { online: false });
      }
    });
  });

  return io;
};

export default initializeSocketIO;
