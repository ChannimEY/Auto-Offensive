"use client";

const LockIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle
      cx="18"
      cy="18"
      r="17"
      stroke="#d1d5db"
      strokeWidth="1.5"
      fill="#f9fafb"
    />
    <rect
      x="11"
      y="17"
      width="14"
      height="11"
      rx="2"
      stroke="#9ca3af"
      strokeWidth="1.5"
    />
    <path
      d="M13 17V14C13 11.2 15.2 9 18 9C20.8 9 23 11.2 23 14V17"
      stroke="#9ca3af"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="18" cy="22" r="1.5" fill="#9ca3af" />
  </svg>
);

export default function RecentScans() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-base font-bold text-gray-800">Recent Scans</h3>
        <span className="text-xs bg-gray-200 text-gray-500 px-2.5 py-0.5 rounded-full font-semibold tracking-wide">
          LOCKED
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-5">
          <LockIcon />
        </div>
        <h4 className="font-bold text-gray-700 mb-2">No scans detected</h4>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          Start your first autonomous audit by entering a target URL above.
          Guest results are cleared every 24 hours.
        </p>
      </div>
    </div>
  );
}
