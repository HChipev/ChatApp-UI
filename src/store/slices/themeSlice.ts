import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "theme",
  storage,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: null, sysPreferenceDarkMode: false },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setSysPreferenceDarkMode: (state, action) => {
      state.sysPreferenceDarkMode = action.payload;
    },
  },
});

export const { setDarkMode, setSysPreferenceDarkMode } = themeSlice.actions;

const identityReducer = persistReducer(persistConfig, themeSlice.reducer);

export default identityReducer;

export const selectCurrentTheme = (state: RootState) => state.theme.darkMode;
export const selectCurrentSystemPreferenceTheme = (state: RootState) =>
  state.theme.sysPreferenceDarkMode;
