import React from "react";
import "./title.css";

const Title = ({ title, color, font }) => {
  return (
    <div className="container">
      <div
        className="header_title"
        style={{ borderColor: `${color}`, fontSize: `${font ? font : "2rem"}` }}
      >
        {title}
      </div>
    </div>
  );
};

export default Title;
