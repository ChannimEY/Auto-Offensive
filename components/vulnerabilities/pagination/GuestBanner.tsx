export default function GuestBanner() {
  return (
    <div className="rounded-2xl border border-teal-300 bg-gradient-to-br from-teal-50 to-cyan-50 p-8 flex items-center justify-between">
      {/* Left: Info */}
      <div>
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-300 bg-white text-teal-700 font-bold tracking-widest mb-4"
          style={{ fontSize: "10px" }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 7v4M8 5v.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          GUEST MODE ACTIVE
        </div>

        {/* Headline */}
        <h3
          className="font-bold text-gray-900 mb-2"
          style={{ fontSize: "22px" }}
        >
          Guest scans are limited to 3 per day.
        </h3>

        {/* Body */}
        <p className="text-gray-500 max-w-lg" style={{ fontSize: "13px" }}>
          Your scan history is not saved. Register now to unlock full PDF
          reporting, historical trends, and automated re-scanning capabilities.
        </p>
      </div>

      {/* Right: CTA */}
      <button
        className="ml-8 flex-shrink-0 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition"
        style={{ fontSize: "14px" }}
      >
        Register now →
      </button>
    </div>
  );
}
