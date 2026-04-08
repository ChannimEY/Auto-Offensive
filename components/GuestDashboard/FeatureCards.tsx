"use client";

const HistoryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke="#6b7280" strokeWidth="1.5" />
    <path
      d="M14 8V14L18 17"
      stroke="#6b7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 14C6 10.7 8.7 8 12 8"
      stroke="#6b7280"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8 10L6 8L4 10"
      stroke="#6b7280"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AIIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="5" stroke="#6b7280" strokeWidth="1.5" />
    <circle cx="14" cy="4" r="2" fill="#6b7280" />
    <circle cx="14" cy="24" r="2" fill="#6b7280" />
    <circle cx="4" cy="14" r="2" fill="#6b7280" />
    <circle cx="24" cy="14" r="2" fill="#6b7280" />
    <path
      d="M14 9V6M14 22V19M9 14H6M22 14H19"
      stroke="#6b7280"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7L5 10L12 3"
      stroke="#14b8a6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const registerFeatures = [
  "Up to 50 Scans Daily",
  "Persistent Scan History",
  "Code Repository Scanning",
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* Persistent History */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
          <HistoryIcon />
        </div>
        <h3 className="font-bold text-gray-800 mb-2">Persistent History</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Guests lose scan data after the session ends. Upgrade to maintain a
          permanent ledger of your security posture.
        </p>
      </div>

      {/* AI-Assisted Remediation */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
          <AIIcon />
        </div>
        <h3 className="font-bold text-gray-800 mb-2">
          AI-Assisted Remediation
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Get step-by-step guidance on how to fix discovered vulnerabilities
          using our proprietary Sentinel-LLM.
        </p>
      </div>

      {/* Why Register */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-teal-400 mb-4">Why Register?</h3>
        <ul className="space-y-2.5 mb-6">
          {registerFeatures.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5">
              <span className="shrink-0">
                <CheckIcon />
              </span>
              <span className="text-sm text-white">{feat}</span>
            </li>
          ))}
        </ul>
        <button className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
          Create Account
        </button>
      </div>
    </div>
  );
}
