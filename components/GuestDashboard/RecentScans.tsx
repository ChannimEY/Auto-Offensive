export default function RecentScans() {
  return (
    <section
      className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 animate-fade-up"
      style={{ animationDelay: "0.15s" }}
    >
      {/* header */}
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-[13px] font-bold text-[var(--text)]">
          Recent Scans
        </h3>
        <span className="bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] text-[10px] font-bold uppercase tracking-wider px-2.5 py-[5px] rounded-full">
          Locked
        </span>
      </div>

      {/* empty state */}
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-4">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              stroke="#b0b0a8"
              strokeWidth="1.8"
            />
            <path
              d="M7 11V7a5 5 0 0110 0v4"
              stroke="#b0b0a8"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-[13px] font-semibold text-[var(--text)] mb-1.5">
          No scans detected
        </p>
        <p className="text-[12px] text-[var(--muted)] leading-relaxed max-w-[240px]">
          Start your first autonomous audit by entering a target URL above.
          Guest results are cleared every 24 hours.
        </p>
      </div>
    </section>
  );
}
