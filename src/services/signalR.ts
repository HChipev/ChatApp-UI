import * as signalR from "@microsoft/signalr";
import { store } from "../store/store";

const createHubConnection = (hubPath: string) => {
  const accessTokenFactory = () => {
    const state = store.getState();
    const token = state.identity.token;

    return token ?? "";
  };

  return new signalR.HubConnectionBuilder()
    .withUrl(`http://localhost:5182/Hubs/${hubPath}`, {
      accessTokenFactory,
    })
    .configureLogging(signalR.LogLevel.None)
    .withAutomaticReconnect()
    .build();
};

const refetchDocumentsHubConnection = createHubConnection("refetch-documents");
const refetchConversationsHubConnection = createHubConnection(
  "refetch-conversations"
);

const startConnection = async () => {
  await stopConnection();

  try {
    await refetchDocumentsHubConnection.start();
    await refetchConversationsHubConnection.start();
  } catch (err) {
    console.error("Error while establishing SignalR connection:", err);
  }
};

const stopConnection = async () => {
  await refetchDocumentsHubConnection.stop();
  await refetchConversationsHubConnection.stop();
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

export {
  startConnection,
  stopConnection,
  addRefetchDocumentsListener,
  addRefetchConversationsListener,
};
