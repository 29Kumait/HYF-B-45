import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Message from "../../assets/message.svg";

const getNotificationIcon = (type) => {
  switch (type) {
    case "New Offer":
      return <img src={Message} alt="Offer" className="notification-icon" />;
  }
};

const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow(); // (e.g., "5 hours ago")
};

const NotificationDropdown = ({ notifications, handleSelectedItem }) => {
  return (
    <ul className="dropdown-menu">
      {notifications.map(
        ({ itemId, notificationType, messageText, timestamp }, index) => (
          <li
            key={`${itemId}-${timestamp || `index-${index}`}`}
            onClick={() => handleSelectedItem(itemId)}
          >
            {getNotificationIcon(notificationType)}
            <div className="notification-info">
              <div className="notification-title">{messageText}</div>
              <div className="notification-timestamp">
                {formatTimestamp(timestamp)}
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array.isRequired,
  handleSelectedItem: PropTypes.func.isRequired,
};

export default NotificationDropdown;
