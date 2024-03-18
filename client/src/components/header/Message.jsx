import React, { useState, useEffect } from "react";
import "./Message.css";
import { useAuth } from "../Account/AuthContext";
import MessageIcon from "../../assets/message.svg";
import NotificationDropdown from "./NotificationDropdown";
import useSocket from "../../hooks/useSocket";
import SideChat from "../chat/SideChat";

const Message = () => {
  const { userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { socket } = useSocket(process.env.BASE_SERVER_URL);
  const [notifications, setNotifications] = useState([]);
  const [isSideChatOpen, setIsSideChatOpen] = useState(false);

  useEffect(() => {
    if (!socket || !userData) return;

    const handleNotification = (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, userData]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectedItem = () => {
    setIsOpen(false);
    setIsSideChatOpen(true);
  };

  const closeSideChat = () => {
    setIsSideChatOpen(false);
  };

  return (
    <div className="message-container">
      <div className="message-icon-container" onClick={toggleDropdown}>
        <img src={MessageIcon} alt="Message" className="message-icon" />
        {notifications.length > 0 && (
          <div className="notification-count">{notifications.length}</div>
        )}
      </div>
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          handleSelectedItem={handleSelectedItem}
        />
      )}
      {isSideChatOpen && <SideChat open={true} onClose={closeSideChat} />}
    </div>
  );
};

export default Message;
