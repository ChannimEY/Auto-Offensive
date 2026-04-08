"use client";

import { useState } from "react";
// import { Header } from "@/components/layout/navbar";
import ScanSection from "@/components/guestdashboard/ScanSection";
import ToolLibrary from "@/components/guestdashboard/ToolLibrary";
import FeatureCards from "@/components/guestdashboard/FeatureCards";
import RecentScans from "@/components/guestdashboard/RecentScans";
import { Header } from "../ui/header-3";

export default function MainContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
      <main className="flex-1 overflow-y-auto py-6">
        {/* Centered container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Basic Scan
              </h1>
              <p className="text-[20px] text-gray-500 dark:text-gray-400">
                Sophisticated penetration testing automation, tailored for
                precision
                <br />
                and speed.
              </p>
            </div>

            {/* Usage Badge */}
            <div
              className="flex items-center gap-3 
                         bg-white dark:bg-gray-800 
                         border border-gray-200 dark:border-gray-700 
                         rounded-xl px-4 py-3 shadow-sm"
            >
              <div
                className="w-9 h-9 rounded-lg 
                           bg-yellow-50 dark:bg-yellow-900/30 
                           border border-yellow-200 dark:border-yellow-700 
                           flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M10 2L4 10H9L8 16L14 8H9L10 2Z" fill="#f59e0b" />
                </svg>
              </div>

              <div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">
                  Today&apos;s Usage
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  0/3 Scans Used Today
                </div>
              </div>
            </div>
          </div>

          <ScanSection />
          <ToolLibrary />
          <FeatureCards />
          <RecentScans />
        </div>
      </main>
    </div>
  );
}
