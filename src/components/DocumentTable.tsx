import React, { useEffect } from "react";
import {
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
  useRestoreDocumentMutation,
} from "../store/slices/api/documentApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { DocumentSimple, DocumentTableProps } from "../interfaces/document";

const DocumentTable: React.FC<DocumentTableProps> = ({
  isRefetchTriggered,
}) => {
  const { data, isLoading, isError, refetch } = useGetDocumentsQuery();
  const [deleteDocument] = useDeleteDocumentMutation();
  const [restoreDocument] = useRestoreDocumentMutation();

  useEffect(() => {
    if (isRefetchTriggered) {
      refetch();
    }
  }, [isRefetchTriggered]);

  const handleDelete = async (document: DocumentSimple) => {
    if (!document.isDeleted) {
      try {
        await deleteDocument(document).unwrap();
        refetch();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const handleRestore = async (document: DocumentSimple) => {
    if (document.isDeleted) {
      try {
        await restoreDocument(document).unwrap();
        refetch();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const handleDownload = (dbDocument: DocumentSimple) => {
    const byteCharacters = atob(dbDocument.bytes);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = dbDocument.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
        <h1 className="text-red-500">Error loading documents!</h1>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full rounded-lg border border-red-500">
      <table className="w-full dark:bg-gray-800 bg-gray-100 text-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-r border-red-500">Id</th>
            <th className="py-2 px-4 border-r border-red-500">Name</th>
            <th className="py-2 px-4 border-red-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.documents.map((document) => (
              <tr key={document.id}>
                <td className="py-2 px-4 border-t border-r border-red-500">
                  {document.id}
                </td>
                <td className="py-2 px-4 border-t border-r border-red-500">
                  {document.name}
                </td>
                <td className="flex justify-around border-t border-red-500 items-center gap-1 py-2 px-4">
                  {document.isDeleted ? (
                    <button
                      onClick={() => handleRestore(document)}
                      className="bg-green-500 hover:bg-green-600 text-white w-full h-8 rounded">
                      <FontAwesomeIcon icon={["fas", "undo"]} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDelete(document)}
                        className={`${
                          document.isDeleted
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        } bg-red-500 hover:bg-red-600 text-gray-200 w-full h-8 rounded mr-2`}
                        disabled={document.isDeleted}>
                        <FontAwesomeIcon icon={["fas", "trash"]} />
                      </button>
                      <button
                        onClick={() => handleDownload(document)}
                        className="bg-blue-500 hover:bg-blue-600 text-white w-full h-8 rounded">
                        <FontAwesomeIcon icon={["fas", "download"]} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
