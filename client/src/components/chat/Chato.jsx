import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuth } from "../Account/AuthContext";
import "./Chato.css";
import FakeUserProfilePicture from "../../assets/fake-user.jpg";

const Chato = () => {
  const { userData } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { itemId } = useParams();

  useEffect(() => {
    const newSocket = io(process.env.BASE_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [itemId]);

  useEffect(() => {
    // Join the chat room based on the item ID
    if (socket) {
      socket.emit("joinRoom", itemId);
    }
  }, [socket, itemId]);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && currentMessage.trim()) {
      const messageData = {
        userName: userData.user.firstName,
        text: currentMessage,
        pic: userData.user.userImageURL,
        room: `room-${itemId}`, // Include the room name in the message data
      };
      socket.emit("chat message", messageData); // Emit message object to server
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="w-message">Welcome to the Chat</h2>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className="message-item">
            <div>
              <img
                src={message.pic || FakeUserProfilePicture}
                alt="profile-pic"
                className="chat-profile-pic"
              />
            </div>
            <div className="message-info">
              <strong className="chat-strong">{message.userName} </strong>
              <span className="message-time">{message.time}</span>
              <div>
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
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
