import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Account/AuthContext.jsx";
import useSocket from "../../hooks/useSocket.js";
import { useAutoScroll } from "../../hooks/useAutoScroll.js";
import FakeUserProfilePicture from "../../assets/fake-user.jpg";
import MessageList from "./MessageList.jsx";
import MessageForm from "./MessageForm.jsx";
import "./Chato.css";

const Chat = () => {
  const { userData } = useAuth();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const { itemId } = useParams();

  const { socket, emitEvent } = useSocket(process.env.BASE_SERVER_URL);

  const messagesEndRef = useAutoScroll([messages]);

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

  const deleteMessage = (id) => {
    emitEvent("delete message", id);
  };

  return socket ? (
    <div className="chat-container">
      <h2 className="w-message">Welcome to the Chat</h2>
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
  ) : (
    <div>Loading Chat...</div>
  );
};

export default Chat;
