import React, { useState, useEffect } from "react";
import "./Message.css";
import useFetch from "../../hooks/useFetch";
import MessageIcon from "../../assets/message.svg";
import { useAuth } from "../Account/AuthContext";
import io from "socket.io-client";

const Message = () => {
  const { userData } = useAuth();
  const [listedItemsIds, setListedItemsIds] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { performFetch } = useFetch(
    `/transactions/${userData.user._id}`,
    (response) => {
      // Update listedItemsIds directly after fetching the data
      const ids = response.listedItems.map((item) => item._id);
      setListedItemsIds(ids);
      // console.log(ids);
    }
  );

  useEffect(() => {
    // Perform fetch when component mounts
    performFetch();
  }, []);

  useEffect(() => {
    // Establish socket connection
    const socket = io(process.env.BASE_SERVER_URL);

    // Listen for notification events
    socket.on("notification", (message) => {
      // Extract the item ID from the message
      const itemId = message.split("-")[1]; // Extracts the part after "room-"

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
