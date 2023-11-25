import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice";
import identityReducer from "./slices/identitySlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    identity: identityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
