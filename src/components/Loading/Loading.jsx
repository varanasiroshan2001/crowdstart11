import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lotties/loading.json";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
