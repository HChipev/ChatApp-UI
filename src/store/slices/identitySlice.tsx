import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const identitySlice = createSlice({
  name: "identity",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = identitySlice.actions;

export default identitySlice.reducer;

export const selectCurrentToken = (state: RootState) => state.identity.token;
