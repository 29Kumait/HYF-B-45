import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.BASE_CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Handle chat messages
    socket.on("chat message", (message) => {
      // Broadcast the message to all connected clients
      io.emit("chat message", message);
    });

    // Handle disconnects
    socket.on("disconnect", () => {
      // Handle user disconnect
    });
  });

  return io;
};

export default initializeSocketIO;
