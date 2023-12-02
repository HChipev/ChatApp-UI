import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentName,
  selectCurrentPicture,
} from "../store/slices/identitySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectCurrentTheme, setDarkMode } from "../store/slices/themeSlice";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const picture = useSelector(selectCurrentPicture);
  const name = useSelector(selectCurrentName);
  const isDarkMode = useSelector(selectCurrentTheme);
  const [isSystemModeDark, setIsSystemModeDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    toggleDarkClass(isDarkMode === null ? mediaQuery.matches : isDarkMode);

    mediaQuery.addEventListener("change", (e) => {
      toggleDarkClass(e.matches);
      setIsSystemModeDark(e.matches);
    });

    return () => {
      mediaQuery.removeEventListener("change", (e) =>
        toggleDarkClass(e.matches)
      );
    };
  }, []);

  const toggleDarkClass = (condition: boolean) => {
    const body = document.body;

    if (condition) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  };

  const toggleTheme = (state: boolean) => {
    dispatch(setDarkMode(state));

    toggleDarkClass(state);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="flex flex-col justify-between bg-gray-200 dark:bg-gray-900 p-4 h-screen min-w-[250px]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={picture ?? undefined}
              alt="Profile"
              className="w-10 h-10 rounded-xl mr-2"
            />
            <div>
              <p className="text-2xl font-semibold text-ellipsis">{name}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center ml-4 text-xl bg-none p-2 w-10 h-10 rounded-md focus:outline-none transition-all">
              <FontAwesomeIcon
                className="text-gray-600 dark:text-gray-300 hover:text-red-500 "
                icon={["fas", "arrow-right-from-bracket"]}
              />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode ?? isSystemModeDark}
              onChange={(e) => toggleTheme(e.target.checked)}
              className="hidden"
            />
            <div className="relative w-12 h-6 transition-all duration-300 ease-in-out bg-gray-400 dark:bg-gray-700 rounded-full">
              <div
                className={`absolute left-0 w-6 h-6 flex justify-center items-center bg-gray-600 dark:bg-gray-300 rounded-full transform transition-all duration-300 ease-in-out ${
                  isDarkMode ? "translate-x-full" : "translate-x-0"
                }`}>
                <FontAwesomeIcon
                  icon={isDarkMode ? ["fas", "moon"] : ["fas", "sun"]}
                  className={`text-lg text-white dark:text-gray-800 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
              </div>
            </div>
            <span
              className={`ml-2 text-sm font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </label>
        </div>
        <div className="flex flex-col overflow-y-auto">
          <p className="text-lg font-semibold mb-2">Today</p>
          {/* Render user messages here */}
          <div className="text-gray-600 dark:text-gray-400">
            <p>Message 1</p>
            <p>Message 2</p>
            {/* Add more messages as needed */}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="flex justify-between items-center bg-gray-400 dark:bg-gray-700 w-full text-xl p-2 rounded-md dark:hover:bg-gray-600 hover:bg-gray-300 text-gray-600 dark:text-gray-300 focus:outline-none">
          New Chat{" "}
          <FontAwesomeIcon className="ml-2" icon={["far", "pen-to-square"]} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
