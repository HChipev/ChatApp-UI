import React from "react";
import {
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
} from "../store/slices/api/documentApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";

const DocumentTable: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetDocumentsQuery();
  const [deleteDocument] = useDeleteDocumentMutation();

  const handleDelete = async (documentId: number) => {
    try {
      await deleteDocument(documentId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-red-500">Error loading documents.</h1>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full rounded-lg border border-red-500">
      <table className="w-full dark:bg-gray-800 bg-gray-100 text-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-r border-b border-red-500">Id</th>
            <th className="py-2 px-4 border-r border-b border-red-500">Name</th>
            <th className="py-2 px-4 border-b border-red-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.documents.map((document) => (
              <tr key={document.id}>
                <td className="py-2 px-4 border-r border-red-500">
                  {document.id}
                </td>
                <td className="py-2 px-4 border-r border-red-500">
                  {document.name}
                </td>
                <td className="flex justify-center items-center py-2 px-4">
                  <button
                    onClick={() => handleDelete(document.id)}
                    className="bg-red-500 hover:bg-red-600 text-gray-200 w-8 h-8 rounded">
                    <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
