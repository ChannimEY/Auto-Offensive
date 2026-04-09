"use client";

import { useState } from "react";

const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" fill="#14b8a6" />
    <path
      d="M5 8L7 10L11 6"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Circle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle
      cx="8"
      cy="8"
      r="7.5"
      stroke="#d1d5db"
      strokeWidth="1.2"
      fill="white"
    />
  </svg>
);

type Tool = {
  name: string;
  type: string;
  active: boolean;
};

const tools: Tool[] = [
  { name: "Subfinder", type: "Recon", active: true },
  { name: "Burp API", type: "Proxy", active: false },
  { name: "Burp API", type: "Proxy", active: false },
  { name: "Burp API", type: "Proxy", active: false },
  { name: "Nuclei", type: "Vuln Scan", active: false },
  { name: "Nuclei", type: "Vuln Scan", active: false },
  { name: "Nuclei", type: "Vuln Scan", active: false },
  { name: "Nuclei", type: "Vuln Scan", active: false },
  { name: "Nuclei", type: "Vuln Scan", active: false },
  { name: "Burp API", type: "Proxy", active: false },
  { name: "Burp API", type: "Proxy", active: false },
  { name: "Burp API", type: "Proxy", active: false },
  { name: "Burp API", type: "Proxy", active: false },
  { name: "Burp API", type: "Proxy", active: false },
];

export default function ToolLibrary() {
  const [selectedTools, setSelectedTools] = useState<number[]>([0]);

  const toggleTool = (idx: number) => {
    setSelectedTools((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Tool Library</h3>
        <span className="text-xs bg-gray-800 text-white px-2.5 py-0.5 rounded-full font-medium">
          {selectedTools.length} ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tools.map((tool, idx) => {
          const isSelected = selectedTools.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => toggleTool(idx)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
                isSelected
                  ? "border-teal-400 bg-white shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  {tool.name}
                </div>
                <div className="text-xs text-gray-400">{tool.type}</div>
              </div>
              {isSelected ? <CheckCircle /> : <Circle />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
