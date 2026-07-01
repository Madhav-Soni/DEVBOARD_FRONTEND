import { LayoutGrid } from "lucide-react";

/**
 * Shared shell for auth pages. Desktop shows a two-column layout:
 * a dark brand panel on the left, the form on the right.
 * On smaller screens the brand panel is hidden and only the form remains.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Brand panel — desktop only */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-slate-900 px-12 py-10 text-white lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
            <LayoutGrid className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold tracking-tight">DevBoard</span>
        </div>

        <div className="max-w-sm">
          <BoardPreview />
          <h2 className="mt-8 text-2xl font-semibold leading-snug">
            Plan sprints. Ship faster. Stay in sync.
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            The Kanban workspace built for engineering teams that move fast.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} DevBoard, Inc.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 sm:px-10 lg:w-1/2">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

/**
 * Small decorative preview of a Kanban board — the signature visual
 * element tying the auth screen back to the product itself.
 */
function BoardPreview() {
  const columns = [
    { title: "To do", cards: 2 },
    { title: "In progress", cards: 3 },
    { title: "Done", cards: 2 },
  ];

  return (
    <div className="grid grid-cols-3 gap-3" aria-hidden="true">
      {columns.map((col) => (
        <div key={col.title} className="rounded-lg bg-white/5 p-2">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {col.title}
          </p>
          <div className="space-y-1.5">
            {Array.from({ length: col.cards }).map((_, i) => (
              <div
                key={i}
                className="h-6 rounded-md bg-white/10"
                style={{ width: i % 2 === 0 ? "100%" : "80%" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}