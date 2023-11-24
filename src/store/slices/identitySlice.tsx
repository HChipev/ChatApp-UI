import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsAuthenticated } = identitySlice.actions;

export default identitySlice.reducer;
