import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Account/AuthContext.jsx";
import useSocket from "../../hooks/useSocket.js";
import { useAutoScroll } from "../../hooks/useAutoScroll.js";
import StranderUserProfilePicture from "../../assets/stranderUserProfilePicture.jpg";
import MessageList from "./MessageList.jsx";
import MessageForm from "./MessageForm.jsx";
import useNotify from "../../hooks/useNotify.js";

import "./chat.css";

const Chat = () => {
  const { notifications, addNotification, clearNotifications } = useNotify();

  const { userData } = useAuth();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const { itemId } = useParams();

  const { socket, emitEvent } = useSocket(process.env.BASE_SERVER_URL);

  const messagesEndRef = useAutoScroll([messages]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!process.env.BASE_SERVER_URL) return;

    if (socket) {
      socket.emit("joinRoom", itemId);

      const handleNewMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        addNotification("You have a new message");
      };

      const handleOldMessages = (oldMsgs) => {
        setOldMessages(oldMsgs);
      };

      const handleDeleteMessage = (messageId) => {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
      };

      socket.on("chat message", handleNewMessage);
      socket.on("oldMessages", handleOldMessages);
      socket.on("message deleted", handleDeleteMessage);

      return () => {
        socket.off("chat message", handleNewMessage);
        socket.off("oldMessages", handleOldMessages);
        socket.off("message deleted", handleDeleteMessage);
      };
    }
  }, [socket, addNotification, itemId]);

  const roomName = itemId ? `room-${itemId}` : null;

  const sendMessage = (e) => {
    if (roomName && currentMessage.trim()) {
      e.preventDefault();
      const messageData = {
        userName: userData.user.firstName,
        text: currentMessage,
        pic: userData.user.userImageURL || StranderUserProfilePicture,
        room: roomName,
      };
      emitEvent("chat message", messageData);
      setCurrentMessage("");
    }
  };

  const deleteMessage = (messageId) => {
    if (roomName && messageId) {
      socket.emit("delete message", { messageId, roomName });
    }
  };

  return (
    <div className="chat-container">
      <h2 className="w-message">Welcome to the Chat</h2>
      {notifications.length > 0 && (
        <div>
          <h4>Notifications</h4>
          <ul>
            {/* {messages.map((message) => (<li key={message._id}>{message.text}</li>))} */}

            {notifications.map((notification, index) => (
              <li key={index}>{notification.text}</li>
            ))}
          </ul>
          <button onClick={clearNotifications}>Clear Notifications</button>
        </div>
      )}

      <MessageList
        messages={messages}
        oldMessages={oldMessages}
        endRef={messagesEndRef}
        deleteMessage={deleteMessage}
      />

      <MessageForm
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
