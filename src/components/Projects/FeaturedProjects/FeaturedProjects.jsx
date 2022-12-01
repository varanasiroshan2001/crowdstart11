import React from "react";
import "./featuredProjects.css";
import ProjectSmallCard from "../ProjctSmallCard/ProjectSmallCard";
import ProjectCard from "../ProjectCard/ProjectCard";
import Title from "../../Headers/Title";
import { useSelector } from "react-redux";

const FeaturedProjects = () => {
  const { loading, projects } = useSelector((state) => state.projects);

  return (
    <div className="container">
      <div className="featured_container">
        <div className="featured_projects">
          {projects &&
            projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                project={project}
                key={project.id}
                style={{ width: "100%" }}
              />
            ))}
        </div>
        <div className="recommended_projects_container">
          <Title
            title="Recommended projects"
            color="var(--primary-blue)"
            font="1.5rem"
            style={{ padding: 0 }}
          />
          <div className="recommended_projects">
            {projects &&
              projects.length > 0 &&
              projects.map((project) => (
                <ProjectSmallCard
                  project={project}
                  key={project.id}
                  style={{ width: "100%" }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
