import React from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
