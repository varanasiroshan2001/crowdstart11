import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./Store";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/authContext";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.FADE
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <App />
      </Provider>
    </AlertProvider>
  </AuthProvider>
);
