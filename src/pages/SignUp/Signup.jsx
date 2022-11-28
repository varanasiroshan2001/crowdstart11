import React, { useState } from "react";
import "./signup.css";
import { PrimaryButton, SecondaryButton } from "../../components/Button/Button";
import { useAuth } from "../../contexts/authContext";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signup, login, currentUser } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log({ email, name, password });
    if (password !== confirmPassword) {
      console.log("Password not same");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signup(email, password);

      const userRef = await addDoc(collection(db, "users"), {
        name,
        email,
        id: "",
        ethId: "",
        imgUrl: "",
      });

      const userUpdateRef = doc(db, "users", userRef.id);
      await updateDoc(userUpdateRef, {
        id: userRef.id,
      });

      dispatch(getUser(currentUser));

      navigate("/");
    } catch (error) {
      console.log("Failed to create account", error);
    }

    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      dispatch(getUser(currentUser));
      navigate("/");
    } catch (error) {
      console.log("Failed to create account", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="signup_main">
        <div className={`signup_bottom ${isSignUp ? "signup" : "login"}`}>
          <div className="bottom_container">
            <section>
              <div></div>
              <h2>
                Welcome to <span className="logo_text">CryptoFunds</span>
              </h2>
              <div className="signup_buttons">
                <p>Already have an account</p>
                <SecondaryButton
                  label="Log in"
                  color="pink"
                  onClick={() => {
                    setIsSignUp(true);
                    resetInputs();
                  }}
                />
              </div>
            </section>
            <section>
              <div></div>

              <h2>
                Welcom back to <span className="logo_text">CryptoFunds</span>
              </h2>
              <div className="signup_buttons">
                <p>Don't have an account</p>
                <SecondaryButton
                  label="Sign Up"
                  color="blue"
                  onClick={() => {
                    setIsSignUp(false);
                    resetInputs();
                  }}
                />
              </div>
            </section>
          </div>
          <div className={`signup_top ${isSignUp ? "open" : "close"}`}>
            <div
              className={`form_container`}
              style={{
                transform: `${
                  isSignUp ? "translateX(-100%)" : "translateX(0)"
                }`,
              }}
            >
              <form className="signup_form">
                <div className="signup_inputs">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      required
                      className="signup_input"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      required
                      className="signup_input"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="signup_input"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password">Password</label>
                    <input
                      type="password"
                      className="signup_input"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <PrimaryButton
                  color="blue"
                  label="Sign Up"
                  onClick={(e) => handleSignUp(e)}
                />
                <div className="mobile_button_container">
                  <p>Already have an account.</p>
                  <SecondaryButton
                    label="Log in"
                    color="pink"
                    onClick={() => {
                      setIsSignUp(true);
                      resetInputs();
                    }}
                  />
                </div>
              </form>
            </div>

            <div
              className="form_container"
              style={{
                transform: `${
                  isSignUp ? "translateX(-100%)" : "translateX(0)"
                }`,
              }}
            >
              <form className="login_form">
                <div className="login_inputs">
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      required
                      className="signup_input"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="signup_input"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <a href="/forgot-password" className="text_link">
                    <p>Forgot password</p>
                  </a>
                </div>
                <PrimaryButton
                  color="pink"
                  label="Log in"
                  onClick={(e) => handleLogin(e)}
                />
                <div className="mobile_button_container">
                  <p style={{ color: "var(--primary-blue)" }}>
                    Don't have an account.
                  </p>
                  <SecondaryButton
                    label="Sign Up"
                    color="blue"
                    onClick={() => {
                      setIsSignUp(false);
                      resetInputs();
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
