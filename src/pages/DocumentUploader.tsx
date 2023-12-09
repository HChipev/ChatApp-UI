import React, { useState, ChangeEvent } from "react";
import { acceptedFileTypes } from "../constants/fileTypes";
import { useAddDocumentMutation } from "../store/slices/api/documentApiSlice";
import DocumentTypeEnum from "../enums/documentTypeEnum";
import { Documents } from "../interfaces/document";

const DocumentUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [addDocuments] = useAddDocumentMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files as FileList);

    const validFiles = newFiles.filter((file) =>
      Object.values(acceptedFileTypes).includes(file.type)
    );

    setFiles([...files, ...validFiles]);
  };

  const handleSendDocuments = async () => {
    const filesToAdd: Documents = { documents: [] };

    await Promise.all(
      files.map(async (file) => {
        const result = await readFileAsDataURL(file);

        if (result) {
          const documentToAdd = {
            name: file.name,
            bytes: result.split(",")[1],
            type: getFileType(file.type),
          };

          filesToAdd.documents.push(documentToAdd);
        }
      })
    );

    try {
      addDocuments(filesToAdd).unwrap();
    } catch (error) {
      console.error("Error adding documents:", error);
    }
  };

  const readFileAsDataURL = (file: File) => {
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event?.target?.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const getFileType = (fileType: string): DocumentTypeEnum | undefined => {
    const fileTypeMap: Record<string, DocumentTypeEnum> = {
      [acceptedFileTypes.pdf]: DocumentTypeEnum.PDF,
      [acceptedFileTypes.docx]: DocumentTypeEnum.DOCX,
      [acceptedFileTypes.pptx]: DocumentTypeEnum.PPTX,
      [acceptedFileTypes.html]: DocumentTypeEnum.HTML,
      [acceptedFileTypes.txt]: DocumentTypeEnum.TXT,
    };

    return fileTypeMap[fileType];
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <div className="flex justify-normal items-center bg-gray-200 dark:bg-gray-900 p-4 rounded-md shadow-md">
        {files.length > 0 ? (
          <button
            onClick={handleSendDocuments}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
            Save
          </button>
        ) : (
          <label className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
            Upload File
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.pptx,.docx,.html,.txt"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
