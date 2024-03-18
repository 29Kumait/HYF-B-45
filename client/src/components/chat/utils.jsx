// utils.jsx
import React from "react";
import moment from "moment";
import MessageIcon from "../../assets/message.svg";

export const getNotificationIcon = (type) => {
  switch (type) {
    case "New Offer":
      return (
        <img src={MessageIcon} alt="Offer" className="notification-icon" />
      );
    // needed other cases
    default:
      return null; // Or a default icon
  }
};

export const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow();
};
