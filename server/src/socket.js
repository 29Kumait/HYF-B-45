import { Server as SocketIOServer } from "socket.io";

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
    },
    pingTimeout: 60000,
  });

  let users = {};

  io.on("connection", (socket) => {
    socket.on("join", ({ userId }) => {
      users[userId] = socket.id;
      socket.emit("joined", { success: true });
    });

    socket.on("direct message", ({ recipientId, message }) => {
      const senderUserId = Object.keys(users).find(
        (key) => users[key] === socket.id
      );
      const recipientSocketId = users[recipientId];
      if (recipientSocketId && senderUserId) {
        io.to(recipientSocketId).emit("direct message", {
          from: senderUserId,
          text: message,
          username: "Sender's Username",
        });
      } else {
        socket.emit("error", { message: "Recipient not connected." });
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
