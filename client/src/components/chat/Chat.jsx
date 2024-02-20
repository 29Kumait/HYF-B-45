import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userData");
    const newSocket = io("http://localhost:5000", {
      query: { token },
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
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
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("missed messages", (missedMessages) => {
        setMessages((prevMessages) => [...prevMessages, ...missedMessages]);
      });

      socket.on("chat message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("disconnect", (reason) => {
        alert(`Disconnected: ${reason}`);
      });
    }
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const messageObj = { from: userId, text: currentMessage };
      socket.emit("direct message", messageObj);
      setCurrentMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.from}: {message.message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
