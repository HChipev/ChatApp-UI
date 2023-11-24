import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { PrivateRouteProps } from "../interfaces/identity";

const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
