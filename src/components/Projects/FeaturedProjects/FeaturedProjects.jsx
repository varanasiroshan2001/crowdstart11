import React from "react";
import "./featuredProjects.css";
import ProjectSmallCard from "../ProjctSmallCard/ProjectSmallCard";
import ProjectCard from "../ProjectCard/ProjectCard";
import Title from "../../Headers/Title";

const FeaturedProjects = () => {
  return (
    <div className="container">
      <div className="featured_container">
        <div className="featured_projects">
          <ProjectCard width="100%" />
          <ProjectCard width="100%" />
        </div>
        <div className="recommended_projects_container">
          <Title
            title="Recommended projects"
            color="var(--primary-blue)"
            font="1.5rem"
          />
          <div className="recommended_projects">
            <ProjectSmallCard />
            <ProjectSmallCard />
            <ProjectSmallCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
