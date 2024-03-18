import React, { useContext } from "react";
import PropTypes from "prop-types";
import { formatTimestamp } from "./utils";
import { AuthContext } from "../Account/AuthContext";
import StranderUserProfilePicture from "../../assets/stranderUserProfilePicture.jpg";
import "./NotificationDropdown.css";

const NotificationDropdown = ({ notifications, handleSelectedItem }) => {
  const { userData } = useContext(AuthContext);

  return (
    <ul className="dropdown-menu">
      {notifications &&
        notifications.map((notification) => (
          <li
            key={notification.id}
            className="notification-item"
            onClick={() => handleSelectedItem(notification)}
          >
            <div className="notification-item-avatar">
              <img
                src={userData.user.userImageURL || StranderUserProfilePicture}
                alt="avatar"
              />
            </div>
            <div className="notification-item-content">
              <div className="notification-item-content-header">
                <span className="notification-item-content-header-username">
                  {userData?.user?.username}
                </span>
                <span className="notification-item-content-header-timestamp">
                  {formatTimestamp(notification?.createdAt)}
                </span>
              </div>
            </div>
          </li>
        ))}
      {notifications && notifications.length === 0 && (
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
