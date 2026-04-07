export default function FeatureCards() {
  return (
    <div
      className="grid grid-cols-3 gap-4 animate-fade-up"
      style={{ animationDelay: "0.1s" }}
    >
      {/* Persistent History */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
        <div className="w-10 h-10 rounded-xl bg-[var(--bg)] flex items-center justify-center mb-4">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke="#6b7280" strokeWidth="1.8" />
            <path
              d="M12 7v5l3.5 3.5"
              stroke="#6b7280"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h4 className="text-[13px] font-bold text-[var(--text)] mb-2">
          Persistent History
        </h4>
        <p className="text-[12px] text-[var(--muted)] leading-relaxed">
          Guests lose scan data after the session ends. Upgrade to maintain a
          permanent ledger of your security posture.
        </p>
      </div>

      {/* AI-Assisted Remediation */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
        <div className="w-10 h-10 rounded-xl bg-[#edf7f2] flex items-center justify-center mb-4">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" stroke="#00c97d" strokeWidth="1.8" />
            <path
              d="M4 20v-1a8 8 0 0116 0v1"
              stroke="#00c97d"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="18.5" cy="5.5" r="2.5" fill="#00c97d" opacity=".25" />
            <circle cx="18.5" cy="5.5" r="1.5" fill="#00c97d" />
          </svg>
        </div>
        <h4 className="text-[13px] font-bold text-[var(--text)] mb-2">
          AI-Assisted Remediation
        </h4>
        <p className="text-[12px] text-[var(--muted)] leading-relaxed">
          Get step-by-step guidance on how to fix discovered vulnerabilities
          using our proprietary Sentinel-LLM.
        </p>
      </div>

      {/* Why Register */}
      <div className="bg-[#0f1a14] rounded-2xl p-5 flex flex-col">
        <h4 className="text-[13px] font-bold text-[var(--accent)] mb-4">
          Why Register?
        </h4>
        <ul className="space-y-2.5 flex-1">
          {[
            "Up to 50 Scans Daily",
            "Persistent Scan History",
            "Code Repository Scanning",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[12px] text-white/90"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="#00c97d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <button className="mt-5 w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-[#0f1a14] text-[13px] font-bold py-2.5 rounded-xl transition-colors">
          Create Account
        </button>
      </div>
    </div>
  );
}
