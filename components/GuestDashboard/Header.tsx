"use client";

export default function Header() {
  return (
    <header className="h-[56px] bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-7 shrink-0">
      {/* tabs */}
      <nav className="flex items-center gap-5 h-full">
        <button className="relative h-full flex items-center text-[13px] font-semibold text-[var(--text)]">
          Dashboard
          <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t bg-[var(--accent)]" />
        </button>
        <button className="h-full flex items-center text-[13px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors">
          Docs
        </button>
      </nav>

      {/* right */}
      <div className="flex items-center gap-3">
        {/* dark mode toggle */}
        <button className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--bg)] transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </button>
        <button className="text-[13px] font-medium text-[var(--text)] hover:text-[var(--muted)] transition-colors">
          Sign In
        </button>
        <button className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors">
          Register Now
        </button>
      </div>
    </header>
  );
}
