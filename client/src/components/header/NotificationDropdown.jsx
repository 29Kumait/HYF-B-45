import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

// import OfferIcon from '../../assets/offer.svg';
import Message from "../../assets/message.svg";

const getNotificationIcon = (type) => {
  switch (type) {
    case "New Offer":
      return <img src={Message} alt="Offer" className="notification-icon" />;
    // case "Item Sold":
    //   return <img src={SoldIcon} alt="Sold" className="notification-icon" />;
    // default:
    //   return null;
  }
};

const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow(); // (e.g., "5 hours ago")
};
const NotificationDropdown = ({ notifications, handleSelectedItem }) => {
  return (
    <ul className="dropdown-menu">
      {notifications.map(
        ({ itemId, notificationType, messageText, timestamp }) => (
          <li key={itemId} onClick={() => handleSelectedItem(itemId)}>
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
  notifications: PropTypes.array.isRequired, // Assuming notifications is an array
  handleSelectedItem: PropTypes.func.isRequired, // Assuming handleSelectedItem is a function
};

export default NotificationDropdown;
