import React from "react";
// import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button/Button";
import Projects from "./Projects";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import checkImg from "../../assets/vectors/check.svg";
import etheriumImg from "../../assets/vectors/etherium.svg";
import projectImg from "../../assets/vectors/project.svg";
import homeImg1 from "../../assets/images/home_card1.png";
import homeImg2 from "../../assets/images/home_card2.png";
import homeImg3 from "../../assets/images/home_card3.png";
import Gradient from "../../assets/gradient/Gradient";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="home_main_container">
        <Gradient />
        <div className="container">
          <div className="home_container">
            <div className="home_details">
              <div className="home_header">
                <div className="hero_title">
                  <p>💡 Turn your ideas into reality</p>
                  <h1>
                    We boost your <span>StartUp</span> to <br />
                    grow into a fortune <br />
                    company.
                  </h1>
                </div>
                <div className="hero_title__overlay" aria-hidden={true}>
                  <p>💡 Turn your ideas into reality</p>
                  <h1>
                    We boost your <span>StartUp</span> to <br />
                    grow into a fortune <br />
                    company.
                  </h1>
                </div>
              </div>
              <div className="home_buttons">
                <PrimaryButton
                  style={{ marginRight: "2rem" }}
                  color="pink"
                  label="Projects"
                />
                <PrimaryButton
                  color="blue"
                  label="Submit project"
                  onClick={() => navigate("/submit-project")}
                />
              </div>
              <div className="home_cards">
                <div className="home_card">
                  <div className="home_box">
                    <img src={projectImg} alt="project" />
                    <h2>24</h2>
                  </div>
                  <h3>
                    Current <br />
                    Projects
                  </h3>
                </div>
                <div className="home_card">
                  <div className="home_box">
                    <img src={etheriumImg} alt="ether" />
                    <h2>18</h2>
                  </div>
                  <h3>
                    Etherium <br />
                    Donated
                  </h3>
                </div>
                <div className="home_card">
                  <div className="home_box">
                    <img src={checkImg} alt="check" />
                    <h2>39</h2>
                  </div>
                  <h3>
                    Successful <br />
                    Projects
                  </h3>
                </div>
              </div>
            </div>
            <div className="home_images">
              <img src={homeImg1} alt="home" />
              <img src={homeImg2} alt="home" />
              <img src={homeImg3} alt="home" />
            </div>
            <div className="scroll_down"></div>
          </div>
        </div>
      </div>
      <Projects />
    </div>
  );
};

export default Home;
