import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  //   console.log(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(name, pass);
      navigate("/");
    } catch (error) {
      console.log("Failed to create account", error);
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <h2>Log in</h2>
        <form>
          <input
            type="email"
            name="email"
            id="email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Log in
          </button>
        </form>
      </div>
      <div>
        Need an an account? <Link to="/signup">Sign up</Link>
      </div>
      <div>
        <Link to="/forgot-password">forgot pass</Link>
      </div>
    </div>
  );
};

export default Login;
