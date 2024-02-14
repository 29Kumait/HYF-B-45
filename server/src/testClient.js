import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust the URL/port as necessary

socket.on("connect", () => {
  console.log("Connected to the server");

  socket.emit("join chat", "someChatId");

  socket.on("chat message", (msg) => {
    console.log("Received message:", msg);
  });

  socket.emit("chat message", {
    chatId: "someChatId",
    msg: "Hello from client!",
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
