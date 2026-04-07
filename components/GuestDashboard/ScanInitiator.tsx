"use client";
import { useState } from "react";

type Mode = "Basic Scan" | "Medium Scan" | "Advance Scan";

const MODES: Mode[] = ["Basic Scan", "Medium Scan", "Advance Scan"];

export default function ScanInitiator() {
  const [target, setTarget] = useState("");
  const [mode, setMode] = useState<Mode>("Basic Scan");

  return (
    <section className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-8 py-7 animate-fade-up">
      <h2 className="text-center text-[18px] font-bold text-[var(--text)] mb-6 tracking-tight">
        Initiate Autonomous Scan
      </h2>

      {/* input row */}
      <div className="flex gap-3 mb-4">
        <label className="flex-1 flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 focus-within:border-[var(--accent)] transition-colors">
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            className="shrink-0 text-[var(--muted)]"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter Target (Domain, URL, or IP)"
            className="flex-1 bg-transparent text-[13px] text-[var(--text)] placeholder-[var(--muted)] outline-none font-mono"
          />
        </label>

        <button className="flex items-center gap-2 bg-[#0f1a14] hover:bg-[#1c2b22] text-white px-5 py-3 rounded-xl text-[13px] font-semibold transition-colors shrink-0">
          {/* play icon */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
          Start Scan
        </button>
      </div>

      {/* mode pills */}
      <div className="flex items-center justify-center gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
              m === mode
                ? "bg-[var(--accent)] text-white shadow-sm"
                : "bg-[#eeeee8] text-[var(--muted)] hover:bg-[#e4e4dc]"
            }`}
          >
            {m === mode ? (
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            )}
            {m}
          </button>
        ))}
      </div>
    </section>
  );
}
