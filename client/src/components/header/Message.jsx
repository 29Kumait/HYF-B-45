import React, { useState, useEffect, useCallback } from "react";
import "./Message.css";
import { useAuth } from "../Account/AuthContext";
import MessageIcon from "../../assets/message.svg";
import NotificationDropdown from "./NotificationDropdown";
import useSocket from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const { userData } = useAuth();
  const [setListedItems] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsIdWithNotifications, setItemsIdWithNotifications] = useState([]);
  const navigate = useNavigate();

  // Check if userData exists before performing the fetch
  useEffect(() => {
    if (userData && userData.user) {
      const { user } = userData;
      const userId = user._id;

      // Perform fetch when userData is available
      const fetchTransactions = async () => {
        try {
          const response = await fetch(
            `${process.env.BASE_SERVER_URL}/api/transactions/${userId}`
          );
          const data = await response.json();
          setListedItems(data.listedItems);
        } catch (error) {
          // console.error("Error fetching transactions:", error);
        }
      };

      fetchTransactions();
    }
  }, [userData]);

  const [notifications, setNotifications] = useState([]);

  // Use the custom useSocket hook

  const { socket } = useSocket(process.env.BASE_SERVER_URL);

  useEffect(() => {
    if (!socket) return;
    const handleNotification = (message) => {
      const [notificationType, itemId, messageText, timestamp] =
        message.split("-");
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { itemId, notificationType, messageText, timestamp },
      ]);
      if (!itemsIdWithNotifications.includes(itemId)) {
        setItemsIdWithNotifications((prevItemsIds) => [
          ...prevItemsIds,
          itemId,
        ]);
        setNotificationCount((prevCount) => prevCount + 1);
      }
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSelectedItem = useCallback(
    (itemId) => {
      navigate(`/item/${itemId}`);
      toggleDropdown();
    },
    [navigate]
  );

  return (
    <div className="message-container">
      <div className="add-item-icon-container" onClick={toggleDropdown}>
        <img src={MessageIcon} alt="Message" className="add-item-icon" />
        {notificationCount > 0 && (
          <div className="notification-count">{notificationCount}</div>
        )}
      </div>
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          handleSelectedItem={handleSelectedItem}
        />
      )}
    </div>
  );
};

export default Message;
