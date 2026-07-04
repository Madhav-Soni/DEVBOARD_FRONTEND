import React from "react";

export default function StatsCard({ title, value, icon: Icon, description, iconColor = "text-blue-600 bg-blue-50" }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h4 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</h4>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconColor}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      {description && (
        <div className="mt-4">
          <span className="text-xs font-medium text-slate-500">{description}</span>
        </div>
      )}
    </div>
  );
}
