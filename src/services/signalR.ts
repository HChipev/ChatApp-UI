import * as signalR from "@microsoft/signalr";
import { store } from "../store/store";

const createHubConnection = (hubPath: string) => {
  const accessTokenFactory = () => {
    const state = store.getState();
    const token = state.identity.token;

    return token ?? "";
  };

  return new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_BASE_HUB_URL}${hubPath}`, {
      accessTokenFactory,
    })
    .configureLogging(signalR.LogLevel.None)
    .withAutomaticReconnect()
    .build();
};

const refetchDocumentsHubConnection = createHubConnection(
  import.meta.env.VITE_REFETCH_DOCUMENTS_HUB_URL
);
const refetchConversationsHubConnection = createHubConnection(
  import.meta.env.VITE_REFETCH_CONVERSATIONS_HUB_URL
);
const refetchAdminDataHubConnections = createHubConnection(
  import.meta.env.VITE_REFETCH_ADMIN_DATA_HUB_URL
);

const startConnection = async () => {
  await stopConnection();

  try {
    await refetchDocumentsHubConnection.start();
    await refetchConversationsHubConnection.start();
    await refetchAdminDataHubConnections.start();
  } catch (err) {
    console.error("Error while establishing SignalR connection:", err);
  }
};

const stopConnection = async () => {
  await refetchDocumentsHubConnection.stop();
  await refetchConversationsHubConnection.stop();
  await refetchAdminDataHubConnections.stop();
};

const addRefetchDocumentsListener = (callback: () => void) => {
  refetchDocumentsHubConnection.on("RefetchDocuments", () => {
    callback();
  });
};

const addRefetchConversationsListener = (callback: () => void) => {
  refetchConversationsHubConnection.on("RefetchConversations", () => {
    callback();
  });
};

const addRefetchUsersListener = (callback: () => void) => {
  refetchAdminDataHubConnections.on("RefetchUsers", () => {
    callback();
  });
};

const addRefetchRolesListener = (callback: () => void) => {
  refetchAdminDataHubConnections.on("RefetchRoles", () => {
    callback();
  });
};

export {
  startConnection,
  stopConnection,
  addRefetchDocumentsListener,
  addRefetchConversationsListener,
  addRefetchRolesListener,
  addRefetchUsersListener,
};
