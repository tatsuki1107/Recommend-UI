import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthService";

type Props = {
  children: React.ReactNode
}

const LoggedInRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />
  }
  return <>{children}</>;
};

export default LoggedInRoute;
