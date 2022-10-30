import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/signup" />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  const { user } = useSelector((state) => state.user);
  const { projectDetails } = useSelector((state) => state.projectDetails);

  if (!currentUser || user?.userEthId !== projectDetails?.creatorEthId) {
    return <Navigate to="/signup" />;
  }

  return children;
};
