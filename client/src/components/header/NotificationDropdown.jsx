import React from "react";
import PropTypes from "prop-types";
import { getNotificationIcon, formatTimestamp } from "../chat/utils";

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
      {notifications.length === 0 && (
        <li className="notification-empty">No new notifications</li>
      )}
    </ul>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array.isRequired,
  handleSelectedItem: PropTypes.func.isRequired,
};

export default NotificationDropdown;
