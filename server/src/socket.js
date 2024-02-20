import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.BASE_CLIENT_URL,
      methods: ["GET", "POST"],
    },
    pingTimeout: 60000,
  });

  let users = {};

  io.on("connection", (socket) => {
    socket.on("join", ({ userId }) => {
      users[userId] = socket.id;
      socket.emit("joined", { success: true });

      socket.on("chat message", (msg) => {
        const message = {
          from: msg.from || "Unknown",
          message: msg.message || msg.text || "",
        };
        socket.broadcast.emit("chat message", message);
      });
    });

    socket.on("direct message", ({ recipientId, message, fromUserId }) => {
      const recipientSocketId = users[recipientId];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("direct message", {
          from: fromUserId,
          text: message,
          username: "Sender's Username",
        });
      } else {
        socket.emit("error", { message: "the other user is  not connected." });
      }
    });

    socket.on("disconnect", () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        delete users[userId];
      }
    });
  });

  return io;
};

export default initializeSocketIO;
