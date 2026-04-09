export default function PageHeader() {
  return (
    <div className="flex items-start justify-between mb-8">
      {/* Left: Title + Description */}
      <div>
        <h1 className="text-5xl font-bold text-gray-600 dark:text-gray-400 mb-4">
          <span style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Vulnerabilities
          </span>
        </h1>
        <p className="text-gray-400 max-w-md" style={{ fontSize: "20px" }}>
          Real-time analysis of security findings across your digital perimeter
          discovered by autonomous agents.
        </p>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex gap-3 mt-1">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 text-sm hover:bg-gray-800 transition">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4h12M4 8h8M6 12h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm transition">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v9M4 8l4 4 4-4M2 14h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download Report
        </button>
      </div>
    </div>
  );
}
