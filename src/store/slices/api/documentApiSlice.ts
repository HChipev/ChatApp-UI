import { DocumentsSimple } from "../../../interfaces/document";
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
    getDocuments: builder.query<DocumentsSimple, void>({
      query: () => "Document/all",
    }),
    deleteDocument: builder.mutation<void, number>({
      query: (documentId) => ({
        url: `Document/delete/${documentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddDocumentMutation,
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
} = documentApiSlice;
