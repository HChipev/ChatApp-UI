import React from "react";
import { CustomGoogleLoginButtonProps } from "../interfaces/identity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomGoogleLoginButton: React.FC<CustomGoogleLoginButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white font-bold py-2 px-4 rounded-md border dark:border-transparent focus:outline-none focus:shadow-outline w-full"
      onClick={onClick}>
      <span className="flex items-center">
        <FontAwesomeIcon
          className="text-red-500 mr-3"
          icon={["fas", "arrow-right"]}
        />
        {children ?? "Sign in with Google"}
      </span>
    </button>
  );
};

export default CustomGoogleLoginButton;
