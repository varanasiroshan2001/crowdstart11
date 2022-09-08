import React from "react";
import "./button.css";
export const PrimaryButton = ({ label, color, onClick, style }) => {
  return (
    <button
      className={`button primary_btn ${color}_btn `}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};

export const SecondaryButton = ({ label, color, onClick, style }) => {
  return (
    <button
      className={`button secondary_btn  ${color}_btn`}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};
