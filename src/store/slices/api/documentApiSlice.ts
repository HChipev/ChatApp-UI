import { BasicResponse } from "../../../interfaces/baseResponse";
import {
  DocumentSimple,
  Documents,
  DocumentsSimple,
} from "../../../interfaces/document";
import { apiSlice } from "./apiSlice";

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDocument: builder.mutation<BasicResponse, Documents>({
      query: (body) => ({
        url: "Document/add",
        method: "POST",
        body: { ...body },
      }),
    }),
    getDocuments: builder.query<DocumentsSimple, void>({
      query: () => "Document/all",
    }),
    deleteDocument: builder.mutation<BasicResponse, DocumentSimple>({
      query: (body) => ({
        url: `Document/delete/${body.id}`,
        method: "DELETE",
        body: { ...body },
      }),
    }),
    restoreDocument: builder.mutation<BasicResponse, DocumentSimple>({
      query: (body) => ({
        url: `Document/restore/${body.id}`,
        method: "PUT",
        body: { ...body },
      }),
    }),
  }),
});

export const {
  useAddDocumentMutation,
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
  useRestoreDocumentMutation,
} = documentApiSlice;
