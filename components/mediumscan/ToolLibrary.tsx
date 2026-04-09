"use client";

export default function ToolLibrary() {
  const tools = [
    { name: "Subfinder", type: "Recon", active: true },
    { name: "Httpx", type: "Recon", active: true },
    { name: "Amass", type: "Recon", active: true },
    { name: "Nmap", type: "Recon", active: true },
    { name: "Burp API", type: "Proxy", active: false },
    { name: "Burp API", type: "Proxy", active: false },
    { name: "Nuclei", type: "Vuln Scan", active: false },
    { name: "Nuclei", type: "Vuln Scan", active: false },
    { name: "Nuclei", type: "Vuln Scan", active: false },
    { name: "Burp API", type: "Proxy", active: false },
    { name: "Burp API", type: "Proxy", active: false },
    { name: "Burp API", type: "Proxy", active: false },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Tool Library
        </h2>

        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-md">
          4 ACTIVE
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-xl px-4 py-4 border transition
              ${
                tool.active
                  ? "border-green-600 bg-gray-100 dark:bg-gray-800"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              }
            `}
          >
            {/* Left Content */}
            <div>
              <p className="text-[20px] font-semibold text-gray-800 dark:text-white">
                {tool.name}
              </p>
              <p className="text-xs text-gray-400">{tool.type}</p>
            </div>

            {/* Right Circle */}
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center
                ${
                  tool.active
                    ? "bg-green-600 border-green-600"
                    : "border-gray-400"
                }
              `}
            >
              {tool.active && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
