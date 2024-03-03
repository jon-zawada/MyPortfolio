import React from "react";
import Portfolio from "./Portfolio";

function ProjectsView({ projects }) {
  return (
    <div className="row mt-30-reverse">
      {projects.map((project) => (
        <div className="col-lg-4 col-md-6 col-12 mt-30" key={project.id}>
          <Portfolio content={project} />
        </div>
      ))}
    </div>
  );
}

export default ProjectsView;

//TODO change name to projects
