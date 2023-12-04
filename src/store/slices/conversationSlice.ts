import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { conversationInitialState } from "../../interfaces/message";

const initialState: conversationInitialState = {
  currentConversation: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    addNewEntry: (state, action) => {
      state.currentConversation.push(action.payload);
    },
    addNewToken: (state, action) => {
      state.currentConversation[
        state.currentConversation.length - 1
      ].message.text += action.payload;
    },
  },
});

export const { setCurrentConversation, addNewEntry, addNewToken } =
  conversationSlice.actions;

export default conversationSlice.reducer;

export const selectCurrentConversation = (state: RootState) =>
  state.conversation.currentConversation;
