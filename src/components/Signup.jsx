import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate()

  //   console.log(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass === conPass) {
      try {
        setLoading(true);
        setError("");
        await signup(name, pass);
      } catch (error) {
        console.log("Failed to create account", error);
      }
      setLoading(false);
    } else {
      return setError("Passwords onot mathch");
    }
  };
  return (
    <div>
      <div>
        <h2>Sign up</h2>
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
          <input
            type="password"
            name="password"
            id="conpassword"
            value={conPass}
            onChange={(e) => setConPass(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Sign up
          </button>
        </form>
      </div>
      <div>
        ALready hava an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
