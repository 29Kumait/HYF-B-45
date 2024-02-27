import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Account/AuthContext.jsx";
import useSocket from "../../hooks/useSocket.js";
import FakeUserProfilePicture from "../../assets/fake-user.jpg";
import "./Chato.css";

const Chat = () => {
  const { userData } = useAuth();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { itemId } = useParams();
  const { socket, emitEvent } = useSocket(process.env.BASE_SERVER_URL);

  useEffect(() => {
    if (!process.env.BASE_SERVER_URL) return;

    if (socket) {
      socket.emit("joinRoom", itemId);

      const handleNewMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      const handleOldMessages = (oldMsgs) => {
        setOldMessages(oldMsgs);
      };

      socket.on("chat message", handleNewMessage);
      socket.on("oldMessages", handleOldMessages);

      return () => {
        socket.off("chat message", handleNewMessage);
        socket.off("oldMessages", handleOldMessages);
      };
    }
  }, [socket, itemId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const messageData = {
        userName: userData.user.firstName,
        text: currentMessage,
        pic: userData.user.userImageURL || FakeUserProfilePicture,
        room: `room-${itemId}`,
      };
      emitEvent("chat message", messageData);
      setCurrentMessage("");
    }
  };

  return socket ? (
    <div className="chat-container">
      <h2 className="w-message">Welcome to the Chat</h2>
      <ul className="message-list">
        {/* Display old messages */}
        {oldMessages.map((message, index) => (
          <li key={`old-${index}`} className="message-item">
            <div>
              <img
                src={message.pic || FakeUserProfilePicture}
                alt="profile-pic"
                className="chat-profile-pic"
              />
            </div>
            <div className="message-info">
              <strong className="chat-strong">{message.userName}</strong>
              <span className="message-time">{message.time}</span>
              <div>
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          </li>
        ))}
        {/* Display new messages */}
        {messages.map((message, index) => (
          <li key={`new-${index}`} className="message-item">
            <div>
              <img
                src={message.pic || FakeUserProfilePicture}
                alt="profile-pic"
                className="chat-profile-pic"
              />
            </div>
            <div className="message-info">
              <strong className="chat-strong">{message.userName}</strong>
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
  ) : (
    <div>Loading Chat...</div>
  );
};

export default Chat;
