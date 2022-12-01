import React, { useEffect } from "react";
import "./projectCard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import sampleImg from "../../../assets/images/sample.png";
import ethereumImg from "../../../assets/vectors/etherium.svg";
import peopleImg from "../../../assets/vectors/team.svg";

const ProjectCard = ({ style, project }) => {
  const navigate = useNavigate();

  return (
    <div className="project_card" style={style}>
      <div className="project_card_container">
        <div className="project_img">
          <img src={project?.imageUrls[0]} alt="sample" />
        </div>
        <div className="card_details">
          <div>
            <Link to={`/project/${project?.id}`}>
              <h2>{project?.projectName}</h2>
            </Link>
            <div className="project_description">
              <p>{project?.projectDescription}</p>
            </div>
          </div>
          <div>
            <div className="eth_details">
              <div className="eth_card">
                <img src={ethereumImg} alt="ether" />
                <div>
                  <h4>{project?.pledgedEth} Ethereum</h4>
                  <p>Pledged</p>
                </div>
              </div>
              <div className="eth_card">
                <img src={ethereumImg} alt="ether" />
                <div>
                  <h4>{project?.receivedEth} Ethereum</h4>
                  <p>Received</p>
                </div>
              </div>{" "}
              <div className="eth_card">
                <img src={peopleImg} alt="ether" />
                <div>
                  <h4>{project?.numDonaters}</h4>
                  <p>Donaters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
