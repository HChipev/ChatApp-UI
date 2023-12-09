import { apiSlice } from "./apiSlice";

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation({
      query: (body) => ({
        url: "Conversation/ask",
        method: "POST",
        body: { ...body },
      }),
    }),
    getUserConversation: builder.query({
      query: (userId) => ({ url: `Conversation/all?userId=${userId}` }),
    }),
    getConversation: builder.mutation({
      query: (conversationId) => ({ url: `Conversation/${conversationId}` }),
    }),
  }),
});

export const {
  useAskQuestionMutation,
  useGetUserConversationQuery,
  useGetConversationMutation,
} = conversationApiSlice;
