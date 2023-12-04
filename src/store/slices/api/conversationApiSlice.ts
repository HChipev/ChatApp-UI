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
  }),
});

export const { useAskQuestionMutation } = conversationApiSlice;
