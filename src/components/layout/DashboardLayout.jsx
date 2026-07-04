import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

/**
 * Persistent shell for all post-login pages.
 * Layout: fixed-height sidebar on the left, a scrollable main column
 * containing the top navbar and the page body.
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      {/* Right column: navbar stacked above scrollable content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
