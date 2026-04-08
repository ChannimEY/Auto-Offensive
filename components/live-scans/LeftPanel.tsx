export default function LeftPanel() {
  return (
    <div className="flex flex-col gap-6">
      {/* Target */}
      <div className="bg-white rounded-xl p-5">
        <p className="font-semibold mb-2">Target Destination</p>

        <input
          placeholder="https://api.target-scope"
          className="w-full bg-gray-100 p-3 rounded-lg"
          style={{ fontSize: "20px" }}
        />

        <p className="text-gray-400 mt-2" style={{ fontSize: "20px" }}>
          Input URLs, IP addresses, or CIDR ranges for recursive assessment.
        </p>
      </div>

      {/* Tools */}
      <div className="bg-white rounded-xl p-5">
        <p className="font-semibold mb-4">Tool Library</p>

        <div className="grid grid-cols-2 gap-3">
          {["Subfinder", "Httpx", "Nuclei", "Nmap"].map((tool) => (
            <div
              key={tool}
              className="border rounded-lg p-3 flex justify-between"
            >
              <span>{tool}</span>
              <span>✔</span>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full bg-green-400 py-3 rounded-lg font-semibold">
          Start Scan
        </button>
      </div>
    </div>
  );
}
