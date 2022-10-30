import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { PrimaryButton, SecondaryButton } from "./Button";
import Navbar from "../Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <h1>Profile</h1>
          <PrimaryButton color="blue" label="Submit" />
          <SecondaryButton color="blue" label="Submit" />

          <p>
            <strong>Email </strong>
            {currentUser?.email}
          </p>
          <Link to="/update-profile">Update</Link>
        </div>

        <h2 onClick={() => handleLogout()}>Logout</h2>
      </div>
    </div>
  );
};

export default Dashboard;
