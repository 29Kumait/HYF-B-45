import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "../Account/AuthContext";
import "./Chato.css";

const Chato = () => {
  const { userData } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const newSocket = io(process.env.BASE_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      // socket.on("try", (message) => {
      //   console.log(message);
      // });
    }
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && currentMessage.trim()) {
      const messageData = {
        userName: userData.user.firstName,
        text: currentMessage,
      };
      socket.emit("chat message", messageData); // Emit message object to server
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className="message-item">
            <div>
              {" "}
              <span className="message-time">{message.time}</span>
            </div>
            <div className="message-info">
              <strong>{message.userName}: </strong>
              <div className="message-text">{message.text}</div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chato;
