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
import { toggleDarkClass } from "./helpers/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentTheme,
  setSysPreferenceDarkMode,
} from "./store/slices/themeSlice";
import { io } from "socket.io-client";
import {
  addNewEntry,
  addNewToken,
  setText,
} from "./store/slices/conversationSlice";
import CurrentConversation from "./pages/CurrentConversation";
import DocumentUploader from "./pages/DocumentUploader";

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

    const socket = io("http://127.0.0.1:3000");

    socket.on("next_token", (data) => {
      if (data.start) {
        dispatch(
          addNewEntry({
            message: {
              text: "",
              isFromUser: false,
              currentMessageLoading: true,
            },
          })
        );
      }

      if (data.done) {
        dispatch(setText(data.text));
      }

      if (data.token) {
        dispatch(addNewToken(data.token));
      }
    });

    return () => {
      socket.disconnect();
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
        <Route element={<PrivateRoute requiredRoles={["User"]} />}>
          <Route index element={<Home />} />
          <Route path="/:conversationId" element={<CurrentConversation />} />
        </Route>
        <Route
          path="/documents"
          element={<PrivateRoute requiredRoles={["Admin"]} />}>
          <Route index element={<DocumentUploader />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
library.add(fas, far, fab);
