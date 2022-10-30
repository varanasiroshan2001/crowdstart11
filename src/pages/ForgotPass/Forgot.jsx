import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { PrimaryButton } from "../../components/Button/Button";
import "./forgot.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  // const navigate = useNavigate();

  //   console.log(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await resetPassword(email);
      //   navigate("/");
    } catch (error) {
      console.log("Failed to create account", error);
      setLoading(false);
    }
  };
  return (
    <div className="forgot_container">
      <div className="forgot_main">
        <div>
          <h2>Password reset</h2>
          <form>
            <div className="forgot_inputs">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                className="signup_input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <PrimaryButton
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
              label="Reset"
              color="pink"
            />
          </form>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <a href="/login" className="text_link">
            <p>Login</p>
          </a>
        </div>
        <div className="flex">
          Need an an account?{" "}
          <a href="/signup" className="text_link">
            <p style={{ marginTop: 0, marginLeft: ".5rem" }}>Sign up</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
