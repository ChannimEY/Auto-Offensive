"use client";
import { useState } from "react";

/* ── icons ─────────────────────────────────────────── */
const IcoOverview = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);
const IcoLive = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path
      d="M12 3v2M12 19v2M3 12h2M19 12h2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoVuln = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 2 3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);
const IcoExport = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IcoSettings = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoSupport = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoUser = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M4 21v-1a8 8 0 0116 0v1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoPlus = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/* ── logo ───────────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2 px-5 py-[18px] border-b border-[var(--border)]">
      {/* shield icon */}
      <div className="w-8 h-8 rounded-lg bg-[#0f1a14] flex items-center justify-center shrink-0">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
            fill="#00c97d"
          />
        </svg>
      </div>
      <div className="leading-none">
        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text)]">
          Auto
        </span>
        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--accent)]">
          Offensive
        </span>
      </div>
    </div>
  );
}

/* ── nav items ──────────────────────────────────────── */
const NAV = [
  { label: "Overview", Icon: IcoOverview },
  { label: "Live Scans", Icon: IcoLive },
  { label: "Vulnerabilities", Icon: IcoVuln },
  { label: "Export", Icon: IcoExport },
];
const BOTTOM_NAV = [
  { label: "Settings", Icon: IcoSettings },
  { label: "Support", Icon: IcoSupport },
];

export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <aside
      className="flex flex-col h-screen bg-[var(--surface)] border-r border-[var(--border)] shrink-0"
      style={{ width: "var(--sidebar-w)" }}
    >
      <Logo />

      {/* user */}
      <div className="px-4 pt-4 pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-[#eeeee8] flex items-center justify-center text-[var(--muted)]">
            <IcoUser />
          </div>
          <div>
            <p className="text-[12px] font-semibold leading-tight text-[var(--text)]">
              Guest Mode
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-0.5">
              Limited Access
            </p>
          </div>
        </div>
        <button className="w-full rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-[12px] font-semibold py-[7px] transition-colors">
          Unlock Full Suite
        </button>
      </div>

      {/* main nav */}
      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
              active === label
                ? "bg-[#edf7f2] text-[var(--accent-dark)]"
                : "text-[var(--muted)] hover:bg-[#f4f4f0] hover:text-[var(--text)]"
            }`}
          >
            <span className={active === label ? "text-[var(--accent)]" : ""}>
              <Icon />
            </span>
            {label}
          </button>
        ))}
      </nav>

      {/* new scan */}
      <div className="px-2.5 pb-3">
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0f1a14] hover:bg-[#1c2b22] text-white text-[13px] font-semibold py-3 transition-colors">
          <IcoPlus />
          New Scan
        </button>
      </div>

      {/* bottom nav */}
      <div className="border-t border-[var(--border)] px-2.5 py-3 space-y-0.5">
        {BOTTOM_NAV.map(({ label, Icon }) => (
          <button
            key={label}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--muted)] hover:bg-[#f4f4f0] hover:text-[var(--text)] transition-all"
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}
