import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentRoles } from "../store/slices/identitySlice";
import { useSelector } from "react-redux";
import React from "react";
import { PrivateRouteProps } from "../interfaces/identity";
import Layout from "../components/Layout";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRoles }) => {
  const roles = useSelector(selectCurrentRoles);
  const location = useLocation();

  return requiredRoles.every((role) => roles?.includes(role)) ? (
    <Layout />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
