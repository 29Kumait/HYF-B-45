import React, { useState, useEffect } from "react";
import "./Message.css";
// import useFetch from "../../hooks/useFetch";
import { useAuth } from "../Account/AuthContext";
import MessageIcon from "../../assets/message.svg";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const { userData } = useAuth();
  const [listedItems, setListedItems] = useState([]);
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

  // Establish socket connection and handle notifications
  useEffect(() => {
    const socket = io(process.env.BASE_SERVER_URL);

    socket.on("notification", (message) => {
      const itemId = message.split("-")[1]; // Extract the item ID from the message

      if (!itemsIdWithNotifications.includes(itemId)) {
        // Include item id related to the notification in the array
        setItemsIdWithNotifications((prevItemsIds) => [
          ...prevItemsIds,
          itemId,
        ]);
        // Increment notification count
        setNotificationCount((prevCount) => prevCount + 1);
      }
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [itemsIdWithNotifications]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSelectedItem = (itemId) => {
    navigate(`/item/${itemId}`);
    toggleDropdown();
  };

  return (
    <div className="message-container">
      <div className="add-item-icon-container" onClick={toggleDropdown}>
        <img src={MessageIcon} alt="Message" className="add-item-icon" />
        {notificationCount > 0 && (
          <div className="notification-count">{notificationCount}</div>
        )}
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {listedItems
            .filter((item) => itemsIdWithNotifications.includes(item._id))
            .map((item) => (
              <li key={item._id} onClick={() => handleSelectedItem(item._id)}>
                {item.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Message;
