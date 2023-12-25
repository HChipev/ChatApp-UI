import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GoogleLogin from "./pages/GoogleLogin";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
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
  selectCurrentConversationId,
  setText,
  setTextOnError,
} from "./store/slices/conversationSlice";
import Document from "./pages/Document";
import NewChat from "./components/NewChat";
import OldChat from "./components/OldChat";
import NotFound from "./pages/NotFound";
import { startConnection, stopConnection } from "./services/signalR";
import Notification from "./components/Notification";
import Admin from "./pages/Admin";
import { setSid } from "./store/slices/identitySlice";
import { NextTokenData } from "./interfaces/conversation";

const App = () => {
  const isDarkMode = useSelector(selectCurrentTheme);
  const currentConversationId = useSelector(selectCurrentConversationId);
  const [socket] = useState(io(import.meta.env.VITE_BASE_MICROSERVICE_URL));
  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    toggleDarkClass(isDarkMode === null ? mediaQuery.matches : isDarkMode);

    mediaQuery.addEventListener("change", (e) => {
      toggleDarkClass(e.matches);
      dispatch(setSysPreferenceDarkMode(e.matches));
    });

    socket.on("connect", () => {
      dispatch(setSid(socket.id));
    });

    startConnection();

    return () => {
      socket.disconnect();
      stopConnection();
      mediaQuery.removeEventListener("change", (e) =>
        toggleDarkClass(e.matches)
      );
    };
  }, []);

  useEffect(() => {
    const handleNextToken = (data: NextTokenData) => {
      if (data.conversationId !== Number(currentConversationId)) {
        return;
      }

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

      if (data.error) {
        dispatch(setTextOnError(data.text));
      }
    };
    socket.off("next_token");

    socket.on("next_token", handleNextToken);
  }, [currentConversationId]);

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ByteBuddy</title>
        <meta
          name="description"
          content="Meet ByteBuddy, your friendly AI assistant! Navigate the world of technology with ByteBuddy's expertise in AI. From answering queries to providing assistance, ByteBuddy is here to make your experience seamless and enjoyable."
        />
        <meta
          name="keywords"
          content="ByteBuddy, AI, assistant, technology, help, support, chatbot, virtual assistant"
        />
        <meta name="author" content="Hristo Chipev" />
        <meta property="og:title" content="ByteBuddy" />
        <meta
          property="og:description"
          content="Meet ByteBuddy, your friendly AI assistant! Navigate the world of technology with ByteBuddy's expertise in AI. From answering queries to providing assistance, ByteBuddy is here to make your experience seamless and enjoyable."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bytebuddy.app/" />
        <meta
          property="og:image"
          content="https://bytebuddy.app/ChatApp-logo.png"
        />
        <meta property="og:image:alt" content="ByteBuddy Logo" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="ByteBuddy AI Assistant" />
        <meta
          property="twitter:description"
          content="Meet ByteBuddy, your friendly AI assistant! Navigate the world of technology with ByteBuddy's expertise in AI. From answering queries to providing assistance, ByteBuddy is here to make your experience seamless and enjoyable."
        />
        <meta
          property="twitter:image"
          content="https://bytebuddy.app/ChatApp-logo.png"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://bytebuddy.app/sitemap.xml"
        />
      </Helmet>
      <Routes>
        <Route path="login" element={<GoogleLogin />} />
        <Route path="/" element={<PrivateRoute requiredRoles={["User"]} />}>
          <Route path="/" element={<Home />}>
            <Route index element={<NewChat />} />
            <Route path="/:conversationId" element={<OldChat />} />
          </Route>
        </Route>
        <Route
          path="/documents"
          element={<PrivateRoute requiredRoles={["Admin"]} />}>
          <Route index element={<Document />} />
        </Route>
        <Route
          path="/admin"
          element={<PrivateRoute requiredRoles={["Admin"]} />}>
          <Route index element={<Admin />} />
        </Route>
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      <Notification />
    </Router>
  );
};

export default App;
library.add(fas, far, fab);
