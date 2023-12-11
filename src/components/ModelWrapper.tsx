import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalWrapperProps } from "../interfaces/navigation";

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex bg-gray-600 bg-opacity-70 items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div
                className="absolute inset-0 bg-darkGray opacity-75"
                onClick={closeModal}></div>
            </div>
            <div className="relative bg-gray-200 dark:bg-gray-900 min-w-fit w-1/2 p-4 rounded-lg shadow-lg">
              <button
                className="absolute top-0 right-0 m-4 text-lg font-bold cursor-pointer hover:text-red transition-colors duration-300 focus:outline-none"
                onClick={closeModal}>
                <FontAwesomeIcon
                  className="hover:text-red-500"
                  icon={["fas", "times"]}
                />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWrapper;
