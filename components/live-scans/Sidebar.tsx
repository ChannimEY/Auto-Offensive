"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// --- Icons ---
const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect
      x="1"
      y="1"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="11"
      y="1"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="1"
      y="11"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="11"
      y="11"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const LiveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 2L3 5V9C3 12.5 5.7 15.7 9 17C12.3 15.7 15 12.5 15 9V5L9 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SupportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="6" r="4" stroke="#888" strokeWidth="1.5" />
    <path
      d="M2 16C2 13 5 11 9 11C13 11 16 13 16 16"
      stroke="#888"
      strokeWidth="1.5"
    />
  </svg>
);

// --- Sidebar ---
export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  const navItems = [
    { label: "Overview", icon: <GridIcon /> },
    { label: "Live Scans", icon: <LiveIcon /> },
    { label: "Vulnerabilities", icon: <ShieldIcon /> },
  ];

  return (
    <aside className="w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen shrink-0 transition-colors">
      {/* Guest Mode */}
      <div className="px-3 pt-4 mb-3">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
            <UserIcon />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[20px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
              Guest Mode
            </span>
            <span className="text-[12px] text-gray-400 dark:text-gray-500 uppercase">
              Limited Access
            </span>
          </div>
        </div>
      </div>

      {/* Unlock Button */}
      <div className="px-3 mb-5">
        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white text-[18px] font-semibold rounded-lg py-2 transition">
          Unlock Full Suite
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            onClick={() => setActive(item.label)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition ${
              active === item.label
                ? "bg-teal-50 dark:bg-teal-900 text-teal-600"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-[18px] whitespace-nowrap">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* New Scan */}
      <div className="px-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white text-[18px] font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2"
        >
          <PlusIcon />
          New Scan
        </motion.button>
      </div>

      {/* Bottom */}
      <div className="px-2 pb-5 space-y-1">
        {[
          { label: "Settings", icon: <SettingsIcon /> },
          { label: "Support", icon: <SupportIcon /> },
        ].map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <span>{item.icon}</span>
            <span className="text-[18px] whitespace-nowrap">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </aside>
  );
}
