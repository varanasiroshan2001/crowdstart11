import React from "react";
import { PrimaryButton } from "../../components/Button";
import "./home.css";
import Navbar from "../../components/Navbar";
import checkImg from "../../assets/vectors/check.svg";
import etheriumImg from "../../assets/vectors/etherium.svg";
import projectImg from "../../assets/vectors/project.svg";
import homeImg1 from "../../assets/images/home_card1.png";
import homeImg2 from "../../assets/images/home_card2.png";
import homeImg3 from "../../assets/images/home_card3.png";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="home_container">
          <div className="home_details">
            <p>💡 Turn your ideas into reality</p>
            <h1>
              We boost your <span>StartUp</span> to <br />
              grow into a fortune <br />
              company.
            </h1>
            <div className="home_buttons">
              <PrimaryButton
                style={{ marginRight: "2rem" }}
                color="pink"
                label="Projects"
              />
              <PrimaryButton color="blue" label="Submit project" />
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
  );
};

export default Home;
