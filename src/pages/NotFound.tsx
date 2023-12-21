import React from "react";
import constants from "../constants/assets";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../store/slices/themeSlice";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const isDarkMode = useSelector(selectCurrentTheme);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-800 items-center justify-center h-screen w-screen">
      <img
        src={constants.notFound}
        alt="Sad Robot"
        className={`mb-4 w-96 h-96 ${!isDarkMode ? "filter invert" : ""}`}
      />
      <h1 className="text-3xl font-semibold mb-2 dark:text-gray-200">
        404 Not Found
      </h1>
      <p className="text-gray-400 dark:text-gray-100">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-4 rounded-md">
        Go back
      </button>
    </div>
  );
};

export default NotFound;
