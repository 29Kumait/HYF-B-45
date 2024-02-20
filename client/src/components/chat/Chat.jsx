import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    if (userData && userData.user && userData.user._id) {
      setUserId(userData.user._id);
    }
    socket.on("direct message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("direct message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      const messageObj = { from: userId, text: messageText };
      socket.emit("sendMessage", messageObj);
      setMessageText("");
    }
  };

  return (
    <div className="App">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>
            {message.from === userId ? "Me" : message.username || "Other"}:{" "}
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
