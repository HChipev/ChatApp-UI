import React, { useState, ChangeEvent } from "react";
import { acceptedFileTypes } from "../constants/fileTypes";
import { useAddDocumentMutation } from "../store/slices/api/documentApiSlice";
import DocumentTypeEnum from "../enums/documentTypeEnum";
import { Documents } from "../interfaces/document";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWrapper from "../components/ModelWrapper";
import DocumentTable from "../components/DocumentTable";
import { addNotification } from "../store/slices/notificationSlice";
import { useDispatch } from "react-redux";

const DocumentUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addDocuments] = useAddDocumentMutation();
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setFiles([]);
    setIsModalOpen(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files as FileList);

    const validFiles = newFiles.filter((file) =>
      Object.values(acceptedFileTypes).includes(file.type)
    );

    setFiles([...files, ...validFiles]);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
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
      await addDocuments(filesToAdd).unwrap();
      dispatch(
        addNotification({
          id: Date.now(),
          type: "success",
          message: "Added documents.",
        })
      );

      closeModal();
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String((error as { data: any }).data),
        })
      );
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
    <div className="flex flex-col p-4 items-center w-full h-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <button
        className="self-end flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 mb-4 rounded-md"
        onClick={openModal}>
        Add documents
        <FontAwesomeIcon className="ml-2" icon={["fas", "plus"]} />
      </button>
      <DocumentTable />

      <ModalWrapper isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex flex-col justify-between items-center bg-gray-200 dark:bg-gray-900 rounded-md min-h-[320px]">
          <h1 className="text-3xl dark:text-gray-200">
            Upload documents modal
          </h1>
          <div className="flex flex-col gap-4 items-center justify-center max-h-80 overflow-y-auto min-w-[50%]">
            {files.length > 0 ? (
              <>
                {files.map((file, index) => (
                  <div key={index} className="mb-2 flex items-center text-2xl">
                    <FontAwesomeIcon
                      icon={["fas", "file-alt"]}
                      className="mr-2 text-blue-500"
                    />
                    {file.name}
                    <FontAwesomeIcon
                      icon={["fas", "times"]}
                      className="ml-2 cursor-pointer text-red-500"
                      onClick={() => handleRemoveFile(index)}
                    />
                  </div>
                ))}
                <button
                  onClick={handleSendDocuments}
                  className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full">
                  Save
                </button>
              </>
            ) : (
              <label className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full text-center">
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
      </ModalWrapper>
    </div>
  );
};

export default DocumentUploader;
