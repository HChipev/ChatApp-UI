import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ConversationInitialState } from "../../interfaces/conversation";

const initialState: ConversationInitialState = {
  currentConversation: [],
  currentConversationLoading: false,
  currentConversationId: null,
  currentConversationUserId: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload.conversation;
      state.currentConversationId = action.payload.conversationId;
      state.currentConversationUserId = action.payload.conversationUserId;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = initialState.currentConversation;
      state.currentConversationId = initialState.currentConversationId;
      state.currentConversationLoading =
        initialState.currentConversationLoading;
      state.currentConversationUserId = initialState.currentConversationUserId;
    },
    addNewEntry: (state, action) => {
      state.currentConversationLoading = true;
      state.currentConversation.push(action.payload);
    },
    addNewToken: (state, action) => {
      state.currentConversationLoading = false;
      const lastMessage =
        state.currentConversation[state.currentConversation.length - 1];
      if (lastMessage.message.isFromUser) {
        state.currentConversation.push({
          message: {
            text: "",
            isFromUser: false,
            currentMessageLoading: false,
          },
        });
      } else {
        lastMessage.message.currentMessageLoading = false;
        lastMessage.message.text += action.payload;
      }
    },
    setText: (state, action) => {
      const lastMessage =
        state.currentConversation[state.currentConversation.length - 1];
      if (lastMessage.message.isFromUser) {
        state.currentConversation.push({
          message: {
            text: action.payload,
            isFromUser: false,
            currentMessageLoading: false,
          },
        });
      } else {
        lastMessage.message.text = action.payload;
      }
    },
    setTextOnError: (state, action) => {
      const lastMessage =
        state.currentConversation[state.currentConversation.length - 1];
      if (lastMessage.message.isFromUser) {
        state.currentConversation.push({
          message: {
            text: action.payload,
            isFromUser: false,
            currentMessageLoading: false,
          },
        });
      } else {
        lastMessage.message.text = action.payload;
        lastMessage.message.currentMessageLoading = false;
        state.currentConversationLoading = false;
      }
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
export const selectCurrentConversationUserId = (state: RootState) =>
  state.conversation.currentConversationUserId;
