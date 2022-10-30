import React from "react";
import "./projectMain.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProjectMain = () => {
  const { loading, projects } = useSelector((state) => state.projects);

  console.log({ projects });

  return (
    <div className="container">
      <div className="main_project_container">
        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
      </div>
    </div>
  );
};

export default ProjectMain;
