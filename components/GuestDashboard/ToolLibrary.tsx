"use client";
import { useState } from "react";

interface Tool {
  id: number;
  name: string;
  category: string;
}

const TOOLS: Tool[] = [
  { id: 1, name: "Subfinder", category: "Recon" },
  { id: 2, name: "Burp API", category: "Proxy" },
  { id: 3, name: "Burp API", category: "Proxy" },
  { id: 4, name: "Burp API", category: "Proxy" },
  { id: 5, name: "Nuclei", category: "Vuln Scan" },
  { id: 6, name: "Nuclei", category: "Vuln Scan" },
  { id: 7, name: "Nuclei", category: "Vuln Scan" },
  { id: 8, name: "Nuclei", category: "Vuln Scan" },
  { id: 9, name: "Nuclei", category: "Vuln Scan" },
  { id: 10, name: "Burp API", category: "Proxy" },
  { id: 11, name: "Burp API", category: "Proxy" },
  { id: 12, name: "Burp API", category: "Proxy" },
  { id: 13, name: "Burp API", category: "Proxy" },
  { id: 14, name: "Burp API", category: "Proxy" },
];

export default function ToolLibrary() {
  const [selected, setSelected] = useState<number>(1);

  return (
    <section
      className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 animate-fade-up"
      style={{ animationDelay: "0.05s" }}
    >
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-[var(--text)]">
          Tool Library
        </h3>
        <span className="bg-[#0f1a14] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-[5px] rounded-full">
          1 Active
        </span>
      </div>

      {/* grid */}
      <div className="grid grid-cols-3 gap-2">
        {TOOLS.map((tool) => {
          const isActive = tool.id === selected;
          return (
            <button
              key={tool.id}
              onClick={() => setSelected(tool.id)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? "border-[var(--accent)] bg-[#edf7f2]"
                  : "border-[var(--border)] bg-[#fafaf8] hover:border-[#c8c8c0]"
              }`}
            >
              <div>
                <p className="text-[12px] font-semibold text-[var(--text)] leading-tight">
                  {tool.name}
                </p>
                <p className="text-[10px] text-[var(--muted)] mt-0.5">
                  {tool.category}
                </p>
              </div>

              {/* radio */}
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]"
                    : "border-[#c8c8c0]"
                }`}
              >
                {isActive && (
                  <svg width="8" height="8" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
