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
        url: import.meta.env.VITE_ASK_QUESTION_API_URL,
        method: "POST",
        body: { ...body },
      }),
    }),
    getUserConversations: builder.query<Conversations, string | undefined>({
      query: (userId) => ({
        url: `${import.meta.env.VITE_GET_USER_CONVERSATIONS_API_URL}${userId}`,
      }),
    }),
    getConversation: builder.mutation<
      GetConversationMessages,
      string | undefined
    >({
      query: (conversationId) => ({
        url: `${
          import.meta.env.VITE_GET_CONVERSATION_API_URL
        }${conversationId}`,
      }),
    }),
    shareConversation: builder.mutation<ShareConversation, string | undefined>({
      query: (conversationId) => ({
        url: `${
          import.meta.env.VITE_SHARE_CONVERSATION_API_URL
        }${conversationId}`,
        method: "PUT",
      }),
    }),
    deleteConversation: builder.mutation<BasicResponse, string | undefined>({
      query: (conversationId) => ({
        url: `${
          import.meta.env.VITE_DELETE_CONVERSATION_API_URL
        }${conversationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAskQuestionMutation,
  useGetUserConversationsQuery,
  useGetConversationMutation,
  useShareConversationMutation,
  useDeleteConversationMutation,
} = conversationApiSlice;
