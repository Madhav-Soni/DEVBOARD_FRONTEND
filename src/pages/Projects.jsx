import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProjectHeader from "../components/project/ProjectHeader";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import CreateProjectModal from "../components/project/CreateProjectModal";
import { PLACEHOLDER_PROJECTS } from "../constants/placeholder";

export default function Projects() {
  const [projects, setProjects] = useState(PLACEHOLDER_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProjectHeader
          title="Projects"
          count={projects.length}
          onCreateProject={() => setIsModalOpen(true)}
        />

        <ProjectGrid
          projects={projects}
          onCreateProject={() => setIsModalOpen(true)}
        />

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProject}
        />
      </div>
    </DashboardLayout>
  );
}
