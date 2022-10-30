import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const ForgotPassword = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  //   console.log(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await resetPassword(name);
    //   navigate("/");
    } catch (error) {
      console.log("Failed to create account", error);
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <h2>Password reset</h2>
        <form>
          <input
            type="email"
            name="email"
            id="email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            // type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Reset password
          </button>
        </form>
      </div>
      <div>
        Need an an account? <Link to="/signup">Sign up</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
