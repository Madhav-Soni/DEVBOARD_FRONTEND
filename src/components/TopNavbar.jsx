import { Search, Bell } from "lucide-react";
import { PLACEHOLDER_USER } from "../constants/placeholder";

/**
 * Top navigation bar rendered above the main content area.
 * Search and notification are UI-only for this milestone.
 */
export default function TopNavbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Search */}
      <div className="relative w-full max-w-xs">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <Search className="h-4 w-4" aria-hidden="true" />
        </span>
        <input
          type="search"
          placeholder="Search projects…"
          aria-label="Search projects"
          className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3
            text-sm text-slate-900 placeholder:text-slate-400
            focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-colors duration-150"
        />
      </div>

      {/* Right side actions */}
      <div className="ml-4 flex items-center gap-2">
        {/* Notifications — UI only */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-slate-500
            hover:bg-slate-100 hover:text-slate-700 transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {/* Unread badge */}
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
        </button>

        {/* User avatar */}
        <button
          type="button"
          aria-label="Open user menu"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs
            font-semibold text-white transition-opacity duration-150 hover:opacity-90
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {PLACEHOLDER_USER.avatarInitials}
        </button>
      </div>
    </header>
  );
}
