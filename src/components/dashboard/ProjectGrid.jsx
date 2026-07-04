import React from "react";
import ProjectCard from "./ProjectCard";
import EmptyState from "./EmptyState";

export default function ProjectGrid({ projects, onCreateProject }) {
  if (!projects || projects.length === 0) {
    return <EmptyState onCreateProject={onCreateProject} />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
