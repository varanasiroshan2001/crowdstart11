import React, { useState } from "react";
import "./signup.css";
import { PrimaryButton, SecondaryButton } from "../components/Button";

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="container">
      <div className="signup_main">
        <div className={`signup_bottom ${isSignUp ? "signup" : "login"}`}>
          <div className="bottom_container">
            <section>
              <div></div>
              <h2>
                Welcom to <span className="logo_text">CryptoFunds</span>
              </h2>
              <div className="signup_buttons">
                <p>Already have an account</p>
                <SecondaryButton
                  label="Log in"
                  color="pink"
                  onClick={() => setIsSignUp(true)}
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
                  onClick={() => setIsSignUp(false)}
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
                    <input type="text" required className="signup_input" />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" required className="signup_input" />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="signup_input" />
                  </div>
                  <div>
                    <label htmlFor="confirm-password">Password</label>
                    <input type="password" className="signup_input" />
                  </div>
                </div>
                <PrimaryButton color="blue" label="Sign Up" />
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
                    <input type="email" required className="signup_input" />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="signup_input" />
                  </div>
                </div>
                <PrimaryButton color="pink" label="Log in" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
