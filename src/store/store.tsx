import { configureStore } from "@reduxjs/toolkit";
import identitySlice from "./slices/identitySlice";

const store = configureStore({
  reducer: {
    identity: identitySlice,
  },
});

export default store;
