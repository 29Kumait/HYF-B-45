import React, { useState, useEffect } from "react";
import "./Message.css";
// import useFetch from "../../hooks/useFetch";
import { useAuth } from "../Account/AuthContext";
import MessageIcon from "../../assets/message.svg";
import io from "socket.io-client";

const Message = () => {
  const { userData } = useAuth();
  const [listedItemsIds, setListedItemsIds] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

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
          const ids = data.listedItems.map((item) => item._id);
          setListedItemsIds(ids);
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

      // Check if the extracted item ID is in listedItemsIds
      if (listedItemsIds.includes(itemId)) {
        // Increment notification count
        setNotificationCount((prevCount) => prevCount + 1);
      }
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [listedItemsIds]);

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
