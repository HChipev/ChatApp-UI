import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../store/slices/identitySlice";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
