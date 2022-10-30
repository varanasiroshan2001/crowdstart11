import React from "react";
import "./button.css";
export const PrimaryButton = ({ label, color, onClick, style, disabled }) => {
  return (
    <button
      className={`button primary_btn ${color}_btn ${disabled ? "disabled" : ""} `}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};

export const SecondaryButton = ({ label, color, onClick, style, disabled }) => {
  return (
    <button
      className={`button secondary_btn  ${color}_btn ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};
