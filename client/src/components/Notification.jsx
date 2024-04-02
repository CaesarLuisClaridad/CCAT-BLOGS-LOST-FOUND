import React, { useEffect } from "react";
import { UseNotificationContext } from "../hooks/UseNotification";

const Notification = () => {
  const { notifications, dispatch } = UseNotificationContext();

  // Convert to function declaration, which is hoisted
  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `http://localhost:5000/notif/notifications`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTIFICATION", payload: json.notification });
        console.log(json);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []); // Call fetchNotifications when the component mounts

  if (notifications.length === 0) return <div>No notifications yet.</div>;

  return (
    <div className="notification-container">
      {notifications.map((notifications) => (
        <div
          key={notifications._id}
          className="d-flex align-items-center notification-message px-1 py-3 border-bottom"
        >
          <i class="bx bxs-heart heart-icon fs-4 me-1 "></i>
          <p className="m-0 fs-6 ">{notifications.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
