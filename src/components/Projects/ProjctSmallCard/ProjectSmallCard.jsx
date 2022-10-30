import React from "react";
import "./projectSmallCard.css";
import sampleImg from "../../../assets/images/sample.png";
import ethereumImg from "../../../assets/vectors/etherium.svg";
import peopleImg from "../../../assets/vectors/team.svg";

const ProjectSmallCard = () => {
  return (
    <div className="project_small_card">
      <div className="project_small_card_container">
        <div className="project_img">
          <img src={sampleImg} alt="sample" />
        </div>
        <div className="small_card_details">
          <div>
            <h2>Lorem ipsum dolor sit amet.</h2>
            <div className="project_description">
              <div className="cover"></div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                perferendis vel cupiditate, id enim ratione error odio ea sunt
                fuga deleniti harum, quam quia, corrupti aut eos eius commodi
                autem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSmallCard;
