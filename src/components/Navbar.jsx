import React from "react";
import "./navbar.css";
import { useAuth } from "../contexts/authContext";
import profileIcon from "../assets/vectors/profile.svg";
import { PrimaryButton, SecondaryButton } from "./Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav_container">
        <div className="logo_text">
          <h2>CF</h2>
        </div>
        <div className="nav_items">
          <div className="navigations">
            <h5>About</h5>
            <h5>Discover</h5>
            <h5>Start a project</h5>
          </div>
          <div className="login_buttons">
            {currentUser ? (
              <img
                src={profileIcon}
                alt="profile"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <div>
                <SecondaryButton
                  label="Login"
                  color="pink"
                  onClick={() => navigate("/signup")}
                  style={{ marginRight: "1rem" }}
                />
                <PrimaryButton
                  label="Sign Up"
                  color="pink"
                  onClick={() => navigate("/signup")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
