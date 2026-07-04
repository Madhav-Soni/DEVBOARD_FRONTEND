import React from "react";
import { FolderPlus } from "lucide-react";
import Button from "../Button";

export default function EmptyState({ onCreateProject }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <FolderPlus className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">No projects found</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Get started by creating your first project to organize tasks, track milestones, and collaborate.
      </p>
      <div className="mt-6">
        <Button onClick={onCreateProject} fullWidth={false} className="px-5">
          Create New Project
        </Button>
      </div>
    </div>
  );
}
