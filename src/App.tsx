import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import GoogleLogin from "./pages/GoogleLogin";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Layout from "./components/Layout";

const App: React.FC = () => {
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
