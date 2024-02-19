import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const url = `${process.env.BASE_SERVER_URL}`;

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const newSocket = io(url, {
      query: { token },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

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
    if (socket && currentMessage.trim()) {
      socket.emit("chat message", { recipientId, msg: currentMessage });
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
        <input
          type="text"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          placeholder="Recipient ID"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
