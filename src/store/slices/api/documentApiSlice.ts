import { apiSlice } from "./apiSlice";

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDocument: builder.mutation({
      query: (body) => ({
        url: "Document/add",
        method: "POST",
        body: { ...body },
      }),
    }),
  }),
});

export const { useAddDocumentMutation } = documentApiSlice;
