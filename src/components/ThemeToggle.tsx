import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentSystemPreferenceTheme,
  selectCurrentTheme,
  setDarkMode,
} from "../store/slices/themeSlice";
import { toggleDarkClass } from "../helpers/theme";
import constants from "../constants/assets";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectCurrentTheme);
  const isSysPreferenceDarkMode = useSelector(
    selectCurrentSystemPreferenceTheme
  );

  const getCurrentTheme = () =>
    isDarkMode === null ? isSysPreferenceDarkMode : isDarkMode;

  const toggleTheme = (state: boolean) => {
    dispatch(setDarkMode(state));

    toggleDarkClass(state);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={getCurrentTheme()}
        onChange={(e) => toggleTheme(e.target.checked)}
        className="hidden"
      />
      <div className="relative w-6 h-12 transition-all duration-300 ease-in-out bg-gray-500 dark:bg-gray-700 rounded-full">
        <div
          className={`absolute left-0 w-6 h-6 flex justify-center items-center bg-gray-200 rounded-full transform transition-all duration-300 ease-in-out ${
            getCurrentTheme() ? "translate-y-full" : "translate-y-0"
          }`}>
          <img
            src={isDarkMode ? constants.sun : constants.moon}
            alt={isDarkMode ? "Sun" : "Moon"}
          />
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;
