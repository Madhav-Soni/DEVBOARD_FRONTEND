import React from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckSquare } from "lucide-react";

export default function ProjectCard({ project }) {
  const { id, name, description, status, tasksTotal, tasksDone, dueDate, color, initials } = project;

  // Calculate task percentage
  const progressPercent = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;

  // Status badge styling helper
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "in progress":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "in review":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Header info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${color || "bg-blue-500"} text-sm font-bold text-white`}>
            {initials || name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 line-clamp-1">{name}</h4>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(status)}`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 flex-1 text-sm text-slate-500 line-clamp-2">
        {description}
      </p>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <CheckSquare className="h-3.5 w-3.5" />
            {tasksDone}/{tasksTotal} Tasks
          </span>
          <span>{progressPercent}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
          <div
            className="h-1.5 rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>Due {dueDate}</span>
        </div>
        <Link
          to={`/projects/${id}`}
          className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Project &rarr;
        </Link>
      </div>
    </div>
  );
}
