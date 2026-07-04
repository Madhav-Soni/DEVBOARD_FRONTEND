import React from "react";
import { Plus } from "lucide-react";
import Button from "../Button";

export default function ProjectHeader({ title = "Projects", count, onCreateProject }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {count !== undefined && (
            <span className="inline-flex h-6 items-center justify-center rounded-full bg-slate-100 px-2.5 text-xs font-semibold text-slate-600">
              {count}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Manage, track, and update all active workspace initiatives.
        </p>
      </div>
      <div>
        <Button onClick={onCreateProject} fullWidth={false} className="flex items-center gap-1.5 px-4">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>
    </div>
  );
}
