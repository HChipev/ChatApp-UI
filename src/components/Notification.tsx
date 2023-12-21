import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectNotifications,
  removeNotification,
} from "../store/slices/notificationSlice";
import { selectCurrentTheme } from "../store/slices/themeSlice";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const isDarkTheme = useSelector(selectCurrentTheme);

  useEffect(() => {
    notifications.forEach((notification) => {
      toast[notification.type](notification.message);
      dispatch(removeNotification(notification.id));
    });
  }, [notifications]);

  return (
    <ToastContainer
      theme={isDarkTheme ? "dark" : "light"}
      position="top-right"
      autoClose={5000}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
    />
  );
};

export default Notification;
