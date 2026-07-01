import { LayoutGrid } from "lucide-react";

/**
 * Wraps the heading, form, and footer link for a single auth screen.
 * Shows the DevBoard logo on small screens, where AuthLayout's
 * brand panel is hidden.
 */
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div>
      <div className="mb-8 flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
          <LayoutGrid className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          DevBoard
        </span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h1>
      {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}

      <div className="mt-8">{children}</div>

      {footer && (
        <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
      )}
    </div>
  );
}