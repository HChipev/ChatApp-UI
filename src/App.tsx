import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GoogleLogin from "./pages/GoogleLogin";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { toggleTheme, toggleDarkClass } from "./helpers/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentTheme,
  setSysPreferenceDarkMode,
} from "./store/slices/themeSlice";

const App = () => {
  const isDarkMode = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    toggleDarkClass(isDarkMode === null ? mediaQuery.matches : isDarkMode);

    mediaQuery.addEventListener("change", (e) => {
      toggleDarkClass(e.matches);
      dispatch(setSysPreferenceDarkMode(e.matches));
    });

    return () => {
      mediaQuery.removeEventListener("change", (e) =>
        toggleDarkClass(e.matches)
      );
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="login" element={<GoogleLogin />} />
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
library.add(fas, far, fab);
