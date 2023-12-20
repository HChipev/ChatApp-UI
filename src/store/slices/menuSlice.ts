import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MenuSliceInitialState } from "../../interfaces/navigation";

const initialState: MenuSliceInitialState = {
  isOpen: false,
  windowWidth: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});

export const { setIsOpen, setWindowWidth } = menuSlice.actions;

export default menuSlice.reducer;

export const selectIsOpen = (state: RootState) => state.menu.isOpen;
export const selectCurrentWindowWidth = (state: RootState) =>
  state.menu.windowWidth;
