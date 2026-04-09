export default function LeftPanel() {
  const tools = [
    { name: "Subfinder", type: "Recon", active: true },
    { name: "Httpx", type: "Discovery", active: true },
    { name: "Nuclei", type: "Vuln Scan", active: false },
    { name: "Nmap", type: "Port Map", active: true },
    { name: "Burp API", type: "Proxy", active: false },
    { name: "Amass", type: "Mapping", active: true },
  ];

  const activeCount = tools.filter((t) => t.active).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Target */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
        <p className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Target Destination
        </p>

        <input
          placeholder="https://api.target-scope"
          className="
            w-full 
            bg-gray-100 dark:bg-gray-700 
            p-3 rounded-lg 
            text-gray-800 dark:text-white
            placeholder-gray-400
            outline-none
          "
        />

        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Input URLs, IP addresses, or CIDR ranges for recursive assessment.
        </p>
      </div>

      {/* Tools */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            Tool Library
          </p>

          <span className="text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-lg font-medium">
            {activeCount} ACTIVE
          </span>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`
                rounded-xl p-4 border flex justify-between items-center
                transition-all duration-200
                ${
                  tool.active
                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40"
                }
              `}
            >
              {/* Left */}
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {tool.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tool.type}
                </p>
              </div>

              {/* Right Icon */}
              <div>
                {tool.active ? (
                  <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-500"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className="
            mt-6 w-full 
            bg-teal-500 hover:bg-green-600 
            text-white 
            py-3 rounded-xl 
            font-semibold 
            flex items-center justify-center gap-2
            transition-all
          "
        >
          🚀 Start Scan
        </button>
      </div>
    </div>
  );
}
