import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCard from "../components/dashboard/StatsCard";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import { PLACEHOLDER_PROJECTS, PLACEHOLDER_USER, PLACEHOLDER_STATS } from "../constants/placeholder";
import { FolderKanban, CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function Dashboard() {
  const navigate = useNavigate();

  // Compute stats
  const totalProjects = PLACEHOLDER_PROJECTS.length;
  const totalCompletedTasks = PLACEHOLDER_PROJECTS.reduce((sum, p) => sum + (p.tasksDone || 0), 0);

  const stats = [
    {
      title: "Active Projects",
      value: totalProjects,
      icon: FolderKanban,
      description: "Projects currently in workspace",
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Tasks Completed",
      value: totalCompletedTasks,
      icon: CheckCircle2,
      description: "Across all active projects",
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Tasks Due Today",
      value: PLACEHOLDER_STATS.tasksDueToday,
      icon: AlertTriangle,
      description: "Requires immediate attention",
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Team Members",
      value: PLACEHOLDER_STATS.teamMembers,
      icon: Users,
      description: "Active collaborators",
      iconColor: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeBanner name={PLACEHOLDER_USER.name} />

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Projects Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Projects</h2>
            <button
              onClick={() => navigate(ROUTES.PROJECTS)}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all projects
            </button>
          </div>

          <ProjectGrid
            projects={PLACEHOLDER_PROJECTS}
            onCreateProject={() => navigate(ROUTES.PROJECTS)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
