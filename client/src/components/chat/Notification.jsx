import React from "react";
import useNotify from "../../hooks/useNotify";

const NotificationComponent = () => {
  const { notifications, clearNotifications } = useNotify();

  return (
    <div>
      {notifications.length > 0 && (
        <div>
          <h2>You have new messages!</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
          <button onClick={clearNotifications}>Clear Notifications</button>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
