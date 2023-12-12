import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ConversationInitialState } from "../../interfaces/conversation";

const initialState: ConversationInitialState = {
  currentConversation: [],
  currentConversationLoading: false,
  currentConversationId: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload.conversation;
      state.currentConversationId = action.payload.conversationId;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = initialState.currentConversation;
      state.currentConversationId = initialState.currentConversationId;
      state.currentConversationLoading =
        initialState.currentConversationLoading;
    },
    addNewEntry: (state, action) => {
      state.currentConversationLoading = true;
      state.currentConversation.push(action.payload);
    },
    addNewToken: (state, action) => {
      state.currentConversationLoading = false;
      const lastMessage =
        state.currentConversation[state.currentConversation.length - 1];
      lastMessage.message.currentMessageLoading = false;
      lastMessage.message.text += action.payload;
    },
    setText: (state, action) => {
      const lastMessage =
        state.currentConversation[state.currentConversation.length - 1];
      lastMessage.message.text = action.payload;
    },
    setTextOnError: (state, action) => {
      const lastMessage =
        state.currentConversation[state.currentConversation.length - 1];
      lastMessage.message.text = action.payload;
      lastMessage.message.currentMessageLoading = false;
      state.currentConversationLoading = false;
    },
  },
});

export const {
  setCurrentConversation,
  addNewEntry,
  addNewToken,
  setText,
  setTextOnError,
  clearCurrentConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;

export const selectCurrentConversation = (state: RootState) =>
  state.conversation.currentConversation;
export const selectCurrentConversationLoading = (state: RootState) =>
  state.conversation.currentConversationLoading;
export const selectCurrentConversationId = (state: RootState) =>
  state.conversation.currentConversationId;
