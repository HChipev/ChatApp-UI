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
        url: import.meta.env.VITE_ADD_DOCUMENTS_API_URL,
        method: "POST",
        body: { ...body },
      }),
    }),
    getDocuments: builder.query<DocumentsSimple, void>({
      query: () => import.meta.env.VITE_GET_DOCUMENTS_API_URL,
    }),
    deleteDocument: builder.mutation<BasicResponse, DocumentSimple>({
      query: (body) => ({
        url: `${import.meta.env.VITE_DELETE_DOCUMENT_API_URL}${body.id}`,
        method: "DELETE",
        body: { ...body },
      }),
    }),
    restoreDocument: builder.mutation<BasicResponse, DocumentSimple>({
      query: (body) => ({
        url: `${import.meta.env.VITE_RESTORE_DOCUMENT_API_URL}${body.id}`,
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
