import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthService";
import { Children } from "../type";

const LoggedInRoute: React.FC<Children> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />
  }
  return <>{children}</>;
};

export default LoggedInRoute;
