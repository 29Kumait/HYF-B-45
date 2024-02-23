import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./Message.css";
import MessageIcon from "../../assets/message.svg";
import io from "socket.io-client";

const Message = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Establish socket connection
    const socket = io(process.env.BASE_SERVER_URL);

    // Listen for notification events
    socket.on("notification", () => {
      // Increment notification count
      setNotificationCount((prevCount) => prevCount + 1);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="message-container">
      <div className="add-item-icon-container">
        <img src={MessageIcon} alt="Message" className="add-item-icon" />
        {notificationCount > 0 && (
          <div className="notification-count">{notificationCount}</div>
        )}
      </div>
    </div>
  );
};

export default Message;
