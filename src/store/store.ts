import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice";
import { persistStore } from "redux-persist";
import identityReducer from "./slices/identitySlice";
import themeReducer from "./slices/themeSlice";
import conversationReducer from "./slices/conversationSlice";
import notificationReducer from "./slices/notificationSlice";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    identity: identityReducer,
    theme: themeReducer,
    conversation: conversationReducer,
    notification: notificationReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);

export { store, persistor };
