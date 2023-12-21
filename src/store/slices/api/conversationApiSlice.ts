import { BasicResponse } from "../../../interfaces/baseResponse";
import {
  Conversation,
  Conversations,
  GenerateAnswer,
  GetConversationMessages,
  ShareConversation,
} from "../../../interfaces/conversation";
import { apiSlice } from "./apiSlice";

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation<Conversation, GenerateAnswer>({
      query: (body) => ({
        url: "Conversation/ask",
        method: "POST",
        body: { ...body },
      }),
    }),
    getUserConversation: builder.query<Conversations, string | undefined>({
      query: (userId) => ({ url: `Conversation/all?userId=${userId}` }),
    }),
    getConversation: builder.mutation<
      GetConversationMessages,
      string | undefined
    >({
      query: (conversationId) => ({ url: `Conversation/${conversationId}` }),
    }),
    shareConversation: builder.mutation<ShareConversation, string | undefined>({
      query: (conversationId) => ({
        url: `Conversation/${conversationId}`,
        method: "PUT",
      }),
    }),
    deleteConversation: builder.mutation<BasicResponse, string | undefined>({
      query: (conversationId) => ({
        url: `Conversation/${conversationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAskQuestionMutation,
  useGetUserConversationQuery,
  useGetConversationMutation,
  useShareConversationMutation,
  useDeleteConversationMutation,
} = conversationApiSlice;
