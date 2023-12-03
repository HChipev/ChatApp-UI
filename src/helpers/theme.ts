import { useDispatch } from "react-redux";
import { setDarkMode } from "../store/slices/themeSlice";

const toggleDarkClass = (condition: boolean) => {
  const body = document.body;

  if (condition) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
};

const toggleTheme = (state: boolean) => {
  const dispatch = useDispatch();
  dispatch(setDarkMode(state));

  toggleDarkClass(state);
};

export { toggleDarkClass, toggleTheme };
