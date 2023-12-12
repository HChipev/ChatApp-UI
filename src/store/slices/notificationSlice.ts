import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NotificationInitialState } from "../../interfaces/notification";

const initialState: NotificationInitialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;

export const selectNotifications = (state: RootState) =>
  state.notification.notifications;
