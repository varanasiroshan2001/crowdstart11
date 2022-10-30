import React from "react";
import ProjectMain from "../../components/Projects/ProjectMain/ProjectMain";
import FeaturedProjects from "../../components/Projects/FeaturedProjects/FeaturedProjects";
import Title from "../../components/Headers/Title";

const Projects = () => {
  return (
    <div>
      <div className="">
        <div>
          <Title title="Recent projects" color="var(--primary-pink)" />
          <ProjectMain />
        </div>
        <div>
          <Title title="Featured projects" color="var(--primary-pink)" />
          <FeaturedProjects />
        </div>
      </div>
    </div>
  );
};

export default Projects;
