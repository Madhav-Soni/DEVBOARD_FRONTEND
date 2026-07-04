import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "../Button";
import InputField from "../InputField";

const COLOR_OPTIONS = [
  { class: "bg-blue-500", name: "Blue" },
  { class: "bg-violet-500", name: "Violet" },
  { class: "bg-emerald-500", name: "Emerald" },
  { class: "bg-amber-500", name: "Amber" },
  { class: "bg-rose-500", name: "Rose" },
];

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "Planning",
    color: "bg-blue-500",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectColor = (colorClass) => {
    setFormData((prev) => ({ ...prev, color: colorClass }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get initials from project name
    const initials = formData.name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    onCreate({
      ...formData,
      id: `proj-${Date.now()}`,
      tasksTotal: 0,
      tasksDone: 0,
      initials: initials || "PR",
      updatedAt: new Date().toISOString().split("T")[0],
    });

    // Reset state & close
    setFormData({
      name: "",
      description: "",
      dueDate: "",
      status: "Planning",
      color: "bg-blue-500",
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal box */}
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Create New Project</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content/Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <InputField
            label="Project Name"
            name="name"
            placeholder="e.g. Migration to v2"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Provide a brief overview of the project objectives..."
              className={`w-full rounded-lg border px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                ${errors.description ? "border-red-500 bg-red-50/50" : "border-slate-300 bg-white"}`}
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              error={errors.dueDate}
              required
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Status
              </label>
              <select
                name="status"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
              </select>
            </div>
          </div>

          {/* Color tag selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Project Color Tag
            </label>
            <div className="flex gap-2.5">
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.class}
                  type="button"
                  onClick={() => handleSelectColor(option.class)}
                  className={`h-7 w-7 rounded-full transition-all duration-100 ${option.class}
                    ${formData.color === option.class ? "ring-2 ring-offset-2 ring-slate-800 scale-110" : "opacity-80 hover:opacity-100"}`}
                  title={option.name}
                />
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
            <Button variant="secondary" onClick={onClose} fullWidth={false} className="px-4 py-2">
              Cancel
            </Button>
            <Button type="submit" fullWidth={false} className="px-4 py-2">
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
