import Sidebar from "@/components/GuestDashboard/Sidebar";
import Header from "@/components/GuestDashboard/Header";
import ScanInitiator from "@/components/GuestDashboard/ScanInitiator";
import ToolLibrary from "@/components/GuestDashboard/ToolLibrary";
import FeatureCards from "@/components/GuestDashboard/FeatureCards";
import RecentScans from "@/components/GuestDashboard/RecentScans";

export default function GuestDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[860px] mx-auto px-8 py-8 space-y-5">
            {/* hero row */}
            <div className="flex items-start justify-between gap-6 animate-fade-up">
              <div>
                <h1 className="text-[32px] font-bold tracking-tight text-[var(--text)] leading-tight">
                  The Autonomous Guardian
                </h1>
                <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed">
                  Sophisticated penetration testing automation, tailored for
                  precision
                  <br />
                  and speed.
                </p>
              </div>

              {/* usage badge */}
              <div className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 shrink-0">
                <div className="w-9 h-9 rounded-lg bg-[#edf7f2] flex items-center justify-center">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      fill="#00c97d"
                      stroke="#00c97d"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-medium">
                    Today's Usage
                  </p>
                  <p className="text-[15px] font-bold text-[var(--text)] leading-tight mt-0.5">
                    0/3 Scans Used Today
                  </p>
                </div>
              </div>
            </div>

            <ScanInitiator />
            <ToolLibrary />
            <FeatureCards />
            <RecentScans />
          </div>
        </main>
      </div>
    </div>
  );
}
