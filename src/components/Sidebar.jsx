import { LayoutGrid, Home, FolderKanban, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const NAV_ITEMS = [
  { label: "Dashboard", icon: Home, to: ROUTES.DASHBOARD },
  { label: "Projects", icon: FolderKanban, to: "/projects" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

/**
 * Left sidebar with the DevBoard logo, primary navigation, and a logout action.
 * Collapses to an icon-only rail on small screens (hidden below md, shown as
 * icon-only between md and lg, full labels at lg+).
 */
export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate(ROUTES.LOGIN, { replace: true });
  }

  return (
    <aside className="flex h-full w-14 flex-col border-r border-slate-200 bg-white lg:w-56">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-slate-200 px-3 lg:px-4">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-blue-600">
          <LayoutGrid className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
        <span className="ml-2.5 hidden text-sm font-semibold tracking-tight text-slate-900 lg:block">
          DevBoard
        </span>
      </div>

      {/* Primary nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3" aria-label="Main navigation">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
            end={to === ROUTES.DASHBOARD}
          >
            <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="hidden lg:block">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 px-2 py-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium
            text-slate-500 transition-colors duration-150 hover:bg-red-50 hover:text-red-600
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="hidden lg:block">Log out</span>
        </button>
      </div>
    </aside>
  );
}
