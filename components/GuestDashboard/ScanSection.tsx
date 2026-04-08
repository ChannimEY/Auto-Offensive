"use client";

import { useState } from "react";

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="#aaa" strokeWidth="1.3" />
    <ellipse cx="9" cy="9" rx="3" ry="7.5" stroke="#aaa" strokeWidth="1.3" />
    <path
      d="M1.5 9H16.5M2.5 6H15.5M2.5 12H15.5"
      stroke="#aaa"
      strokeWidth="1.3"
    />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5 3L13 8L5 13V3Z" fill="white" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" fill="#22c55e" />
    <path
      d="M4 7L6 9L10 5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" fill="#d1d5db" />
    <rect
      x="4.5"
      y="6.5"
      width="5"
      height="4"
      rx="0.5"
      stroke="#9ca3af"
      strokeWidth="1.2"
    />
    <path
      d="M5 6.5V5C5 3.9 5.9 3 7 3C8.1 3 9 3.9 9 5V6.5"
      stroke="#9ca3af"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

type ScanType = "Basic Scan" | "Medium Scan" | "Advance Scan";

export default function ScanSection() {
  const [target, setTarget] = useState("");
  const [activeScan, setActiveScan] = useState<ScanType>("Basic Scan");

  const scanTypes: { label: ScanType; unlocked: boolean }[] = [
    { label: "Basic Scan", unlocked: true },
    { label: "Medium Scan", unlocked: false },
    { label: "Advance Scan", unlocked: false },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
      <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
        Initiate Autonomous Scan
      </h2>

      {/* Input + Button */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-teal-400 focus-within:bg-white transition-colors">
          <span className="text-gray-400 shrink-0">
            <GlobeIcon />
          </span>
          <input
            type="text"
            placeholder="Enter Target (Domain, URL, or IP)"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm rounded-xl px-6 flex items-center gap-2 transition-colors whitespace-nowrap shadow-sm">
          <PlayIcon />
          Start Scan
        </button>
      </div>

      {/* Scan Type Tabs */}
      <div className="flex items-center justify-center gap-3">
        {scanTypes.map((type) => (
          <button
            key={type.label}
            onClick={() => type.unlocked && setActiveScan(type.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeScan === type.label
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-150"
            } ${!type.unlocked ? "cursor-default opacity-70" : "cursor-pointer"}`}
          >
            {type.unlocked ? <CheckIcon /> : <LockIcon />}
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
