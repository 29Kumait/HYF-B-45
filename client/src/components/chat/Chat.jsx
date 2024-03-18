import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Account/AuthContext.jsx";
import useSocket from "../../hooks/useSocket.js";
import { useAutoScroll } from "../../hooks/useAutoScroll.js";
import StranderUserProfilePicture from "../../assets/stranderUserProfilePicture.jpg";
import MessageList from "./MessageList.jsx";
import MessageForm from "./MessageForm.jsx";
import "./chat.css";

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

      const handleDeleteMessage = (messageId) => {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
        setOldMessages((prevOldMessages) =>
          prevOldMessages.filter((message) => message._id !== messageId)
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
  }, [socket, itemId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (itemId && currentMessage.trim()) {
      const messageData = {
        userName: userData.user.firstName,
        text: currentMessage,
        pic: userData.user.userImageURL || StranderUserProfilePicture,
        room: `room-${itemId}`,
      };
      emitEvent("chat message", messageData);
      setCurrentMessage("");
    }
  };

  const deleteMessage = (messageId) => {
    if (itemId && messageId) {
      socket.emit("delete message", { messageId, roomName: `room-${itemId}` });
    }
  };

  return (
    <div className="chat-container">
      <h2 className="w-message"> Messages </h2>

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
