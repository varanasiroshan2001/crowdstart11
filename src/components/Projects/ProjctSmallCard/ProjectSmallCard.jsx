import React from "react";
import "./projectSmallCard.css";
import sampleImg from "../../../assets/images/sample.png";
import ethereumImg from "../../../assets/vectors/etherium.svg";
import peopleImg from "../../../assets/vectors/team.svg";

const ProjectSmallCard = ({ project }) => {
  return (
    <div className="project_small_card">
      <div className="project_small_card_container">
        <div className="project_img">
          <img src={project?.imageUrls[0]} alt="sample" />
        </div>
        <div className="small_card_details">
          <div>
            <h2>{project?.projectName}</h2>
            <div className="project_description">
              <div className="cover"></div>
              <p>{project?.projectDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSmallCard;
