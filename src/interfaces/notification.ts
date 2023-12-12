interface Notification {
  id: number;
  type: "success" | "error" | "warning" | "info";
  message: string;
}

interface NotificationInitialState {
  notifications: Notification[];
}

export type { Notification, NotificationInitialState };
